/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.rest.internal.manager.v1_0;

import com.liferay.account.constants.AccountConstants;
import com.liferay.account.model.AccountEntry;
import com.liferay.account.service.AccountEntryService;
import com.liferay.account.service.AccountEntryUserRelLocalService;
import com.liferay.ai.hub.rest.dto.v1_0.ProvisioningRequest;
import com.liferay.ai.hub.rest.manager.v1_0.ProvisioningRequestManager;
import com.liferay.headless.common.spi.service.context.ServiceContextBuilder;
import com.liferay.oauth2.provider.constants.ClientProfile;
import com.liferay.oauth2.provider.constants.GrantType;
import com.liferay.oauth2.provider.model.OAuth2Application;
import com.liferay.oauth2.provider.service.OAuth2ApplicationLocalService;
import com.liferay.oauth2.provider.util.OAuth2SecureRandomGenerator;
import com.liferay.object.model.ObjectDefinition;
import com.liferay.object.model.ObjectEntry;
import com.liferay.object.service.ObjectDefinitionLocalService;
import com.liferay.object.service.ObjectEntryLocalService;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.model.UserConstants;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalService;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.workflow.WorkflowConstants;
import com.liferay.portal.vulcan.dto.converter.DTOConverterContext;

import java.io.Serializable;

import java.util.Calendar;
import java.util.Collections;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Davyson Melo
 */
@Component(service = ProvisioningRequestManager.class)
public class ProvisioningRequestManagerImpl
	implements ProvisioningRequestManager {

	@Override
	public void postProvisioning(
			Company company, DTOConverterContext dtoConverterContext,
			ProvisioningRequest provisioningRequest)
		throws Exception {

		long companyId = company.getCompanyId();

		AccountEntry aiHubAccountEntry =
			_accountEntryService.getAccountEntryByExternalReferenceCode(
				"L_AI_HUB", companyId);

		ServiceContext serviceContext = ServiceContextBuilder.create(
			company.getGroupId(), dtoConverterContext.getHttpServletRequest(),
			null
		).build();

		serviceContext.setCompanyId(companyId);
		serviceContext.setUserId(dtoConverterContext.getUserId());

		AccountEntry customerAccountEntry = _getOrAddAccountEntry(
			companyId, dtoConverterContext,
			provisioningRequest.getCustomerName(), serviceContext);

		long[] accountEntryIds = {
			aiHubAccountEntry.getAccountEntryId(),
			customerAccountEntry.getAccountEntryId()
		};

		User serviceAccountUser = _getOrAddUser(
			company, dtoConverterContext,
			provisioningRequest.getCustomerName() + "-service-account",
			serviceContext);
		User guestServiceAccountUser = _getOrAddUser(
			company, dtoConverterContext,
			provisioningRequest.getCustomerName() + "-guest-service-account",
			serviceContext);

		_accountEntryUserRelLocalService.updateAccountEntryUserRels(
			accountEntryIds, new long[0], serviceAccountUser.getUserId());
		_accountEntryUserRelLocalService.updateAccountEntryUserRels(
			accountEntryIds, new long[0], guestServiceAccountUser.getUserId());

		_getOrAddOAuth2Application(
			companyId, dtoConverterContext, provisioningRequest,
			serviceAccountUser, serviceContext);

		_addQuotas(
			companyId, dtoConverterContext, customerAccountEntry,
			serviceContext);
	}

	private void _addQuotaObjectEntry(
			DTOConverterContext dtoConverterContext, AccountEntry accountEntry,
			String externalReferenceCode, ObjectDefinition objectDefinition,
			ServiceContext serviceContext)
		throws Exception {

		ObjectEntry objectEntry = _objectEntryLocalService.fetchObjectEntry(
			externalReferenceCode, 0, objectDefinition.getObjectDefinitionId());

		if (objectEntry != null) {
			return;
		}

		_objectEntryLocalService.addObjectEntry(
			0, dtoConverterContext.getUserId(),
			objectDefinition.getObjectDefinitionId(), 0,
			LocaleUtil.toLanguageId(dtoConverterContext.getLocale()),
			HashMapBuilder.<String, Serializable>put(
				"externalReferenceCode", externalReferenceCode
			).put(
				"limit", _QUOTA_TOKEN_LIMIT
			).put(
				"r_accountToAIHubQuotas_accountEntryId",
				accountEntry.getAccountEntryId()
			).put(
				"usage", 0
			).build(),
			serviceContext);
	}

	private void _addQuotas(
			long companyId, DTOConverterContext dtoConverterContext,
			AccountEntry accountEntry, ServiceContext serviceContext)
		throws Exception {

		ObjectDefinition objectDefinition =
			_objectDefinitionLocalService.
				getObjectDefinitionByExternalReferenceCode(
					"L_AI_HUB_QUOTA", companyId);

		_addQuotaObjectEntry(
			dtoConverterContext, accountEntry,
			"guest-quota-" + accountEntry.getAccountEntryId(), objectDefinition,
			serviceContext);
		_addQuotaObjectEntry(
			dtoConverterContext, accountEntry,
			"quota-" + accountEntry.getAccountEntryId(), objectDefinition,
			serviceContext);
	}

	private AccountEntry _getOrAddAccountEntry(
			long companyId, DTOConverterContext dtoConverterContext,
			String name, ServiceContext serviceContext)
		throws Exception {

		AccountEntry accountEntry =
			_accountEntryService.fetchAccountEntryByExternalReferenceCode(
				name, companyId);

		if (accountEntry != null) {
			return accountEntry;
		}

		return _accountEntryService.addAccountEntry(
			null, dtoConverterContext.getUserId(),
			AccountConstants.PARENT_ACCOUNT_ENTRY_ID_DEFAULT, name, null, null,
			null, null, null, AccountConstants.ACCOUNT_ENTRY_TYPE_BUSINESS,
			WorkflowConstants.STATUS_APPROVED, serviceContext);
	}

	private OAuth2Application _getOrAddOAuth2Application(
			long companyId, DTOConverterContext dtoConverterContext,
			ProvisioningRequest provisioningRequest, User clientCredentialUser,
			ServiceContext serviceContext)
		throws Exception {

		String externalReferenceCode = StringUtil.toUpperCase(
			provisioningRequest.getCustomerName() + "-ai-hub");

		OAuth2Application oAuth2Application =
			_oAuth2ApplicationLocalService.
				fetchOAuth2ApplicationByExternalReferenceCode(
					externalReferenceCode, companyId);

		if (oAuth2Application != null) {
			return oAuth2Application;
		}

		String portalURL = provisioningRequest.getLiferayDXPURL();

		User user = dtoConverterContext.getUser();

		return _oAuth2ApplicationLocalService.addOrUpdateOAuth2Application(
			externalReferenceCode, user.getUserId(), user.getFullName(),
			Collections.singletonList(GrantType.CLIENT_CREDENTIALS),
			"client_secret_post", clientCredentialUser.getUserId(),
			OAuth2SecureRandomGenerator.generateClientId(),
			ClientProfile.HEADLESS_SERVER.id(),
			OAuth2SecureRandomGenerator.generateClientSecret(), null,
			Collections.emptyList(), portalURL, 0, null, "AI Hub", null,
			Collections.singletonList(portalURL), false,
			Collections.emptyList(), false, serviceContext);
	}

	private User _getOrAddUser(
			Company company, DTOConverterContext dtoConverterContext,
			String screenName, ServiceContext serviceContext)
		throws Exception {

		User user = _userLocalService.fetchUserByScreenName(
			company.getCompanyId(), screenName);

		if (user != null) {
			return user;
		}

		user = _userLocalService.addUser(
			dtoConverterContext.getUserId(), company.getCompanyId(), true, null,
			null, false, screenName,
			screenName + StringPool.AT + company.getMx(),
			dtoConverterContext.getLocale(), screenName, StringPool.BLANK,
			screenName, 0, 0, true, Calendar.JANUARY, 1, 1970, StringPool.BLANK,
			UserConstants.TYPE_SERVICE_ACCOUNT, null, null, null, null, false,
			serviceContext);

		user.setPasswordReset(false);
		user.setEmailAddressVerified(true);

		return _userLocalService.updateUser(user);
	}

	private static final int _QUOTA_TOKEN_LIMIT = 33333333;

	@Reference
	private AccountEntryService _accountEntryService;

	@Reference
	private AccountEntryUserRelLocalService _accountEntryUserRelLocalService;

	@Reference
	private OAuth2ApplicationLocalService _oAuth2ApplicationLocalService;

	@Reference
	private ObjectDefinitionLocalService _objectDefinitionLocalService;

	@Reference
	private ObjectEntryLocalService _objectEntryLocalService;

	@Reference
	private UserLocalService _userLocalService;

}