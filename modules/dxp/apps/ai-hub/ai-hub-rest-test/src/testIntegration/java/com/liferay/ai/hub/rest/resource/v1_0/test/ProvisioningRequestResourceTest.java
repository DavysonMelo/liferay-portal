/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.rest.resource.v1_0.test;

import com.liferay.account.constants.AccountConstants;
import com.liferay.account.model.AccountEntry;
import com.liferay.account.service.AccountEntryLocalService;
import com.liferay.account.service.AccountEntryUserRelLocalService;
import com.liferay.ai.hub.rest.client.dto.v1_0.ProvisioningRequest;
import com.liferay.arquillian.extension.junit.bridge.junit.Arquillian;
import com.liferay.oauth2.provider.constants.GrantType;
import com.liferay.oauth2.provider.model.OAuth2Application;
import com.liferay.oauth2.provider.service.OAuth2ApplicationLocalService;
import com.liferay.object.model.ObjectDefinition;
import com.liferay.object.model.ObjectEntry;
import com.liferay.object.service.ObjectDefinitionLocalService;
import com.liferay.object.service.ObjectEntryLocalService;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.model.UserConstants;
import com.liferay.portal.kernel.security.auth.PrincipalThreadLocal;
import com.liferay.portal.kernel.security.permission.PermissionChecker;
import com.liferay.portal.kernel.security.permission.PermissionCheckerFactoryUtil;
import com.liferay.portal.kernel.security.permission.PermissionThreadLocal;
import com.liferay.portal.kernel.service.ServiceContextThreadLocal;
import com.liferay.portal.kernel.service.UserLocalService;
import com.liferay.portal.kernel.test.util.ServiceContextTestUtil;
import com.liferay.portal.kernel.test.util.TestPropsValues;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.test.rule.FeatureFlag;
import com.liferay.portal.test.rule.Inject;
import com.liferay.site.initializer.SiteInitializer;
import com.liferay.site.initializer.SiteInitializerRegistry;

import java.io.Serializable;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * @author Carolina Barbosa
 */
@FeatureFlag("LPD-62272")
@RunWith(Arquillian.class)
public class ProvisioningRequestResourceTest
	extends BaseProvisioningRequestResourceTestCase {

	@BeforeClass
	public static void setUpClass() throws Exception {
		_originalPermissionChecker =
			PermissionThreadLocal.getPermissionChecker();

		PermissionThreadLocal.setPermissionChecker(
			PermissionCheckerFactoryUtil.create(TestPropsValues.getUser()));

		_originalName = PrincipalThreadLocal.getName();

		PrincipalThreadLocal.setName(TestPropsValues.getUserId());

		ServiceContextThreadLocal.pushServiceContext(
			ServiceContextTestUtil.getServiceContext(
				TestPropsValues.getGroupId(), TestPropsValues.getUserId()));

		SiteInitializer siteInitializer =
			_siteInitializerRegistry.getSiteInitializer(
				"com.liferay.ai.hub.site.initializer");

		siteInitializer.initialize(TestPropsValues.getGroupId());
	}

	@AfterClass
	public static void tearDownClass() {
		PermissionThreadLocal.setPermissionChecker(_originalPermissionChecker);
		PrincipalThreadLocal.setName(_originalName);
		ServiceContextThreadLocal.popServiceContext();
	}

	@Override
	@Test
	public void testPostProvisioning() throws Exception {
		ProvisioningRequest provisioningRequest = randomProvisioningRequest();

		provisioningRequest.setLiferayDXPURL("https://example.com");

		String customerName = provisioningRequest.getCustomerName();

		provisioningRequestResource.postProvisioning(provisioningRequest);

		User serviceAccountUser = _userLocalService.getUserByScreenName(
			TestPropsValues.getCompanyId(), customerName + "-service-account");

		Assert.assertEquals(
			UserConstants.TYPE_SERVICE_ACCOUNT, serviceAccountUser.getType());

		List<AccountEntry> customerAccountEntries =
			_accountEntryLocalService.getUserAccountEntries(
				serviceAccountUser.getUserId(),
				AccountConstants.PARENT_ACCOUNT_ENTRY_ID_DEFAULT, customerName,
				null, 0, 1);

		Assert.assertEquals(
			customerAccountEntries.toString(), 1,
			customerAccountEntries.size());

		AccountEntry customerAccountEntry = customerAccountEntries.get(0);

		Assert.assertEquals(customerName, customerAccountEntry.getName());

		User guestServiceAccountUser = _userLocalService.getUserByScreenName(
			TestPropsValues.getCompanyId(),
			customerName + "-guest-service-account");

		Assert.assertEquals(
			UserConstants.TYPE_SERVICE_ACCOUNT,
			guestServiceAccountUser.getType());

		Assert.assertNotNull(
			_accountEntryUserRelLocalService.fetchAccountEntryUserRel(
				customerAccountEntry.getAccountEntryId(),
				serviceAccountUser.getUserId()));
		Assert.assertNotNull(
			_accountEntryUserRelLocalService.fetchAccountEntryUserRel(
				customerAccountEntry.getAccountEntryId(),
				guestServiceAccountUser.getUserId()));

		ObjectDefinition objectDefinition =
			_objectDefinitionLocalService.
				getObjectDefinitionByExternalReferenceCode(
					"L_AI_HUB_QUOTA", TestPropsValues.getCompanyId());

		long accountEntryId = customerAccountEntry.getAccountEntryId();

		_assertQuotaObjectEntry(
			objectDefinition, "guest-quota-" + accountEntryId);
		_assertQuotaObjectEntry(objectDefinition, "quota-" + accountEntryId);

		AccountEntry aiHubAccountEntry =
			_accountEntryLocalService.getAccountEntryByExternalReferenceCode(
				"L_AI_HUB", TestPropsValues.getCompanyId());

		Assert.assertNotNull(
			_accountEntryUserRelLocalService.fetchAccountEntryUserRel(
				aiHubAccountEntry.getAccountEntryId(),
				serviceAccountUser.getUserId()));
		Assert.assertNotNull(
			_accountEntryUserRelLocalService.fetchAccountEntryUserRel(
				aiHubAccountEntry.getAccountEntryId(),
				guestServiceAccountUser.getUserId()));

		OAuth2Application oAuth2Application =
			_oAuth2ApplicationLocalService.
				fetchOAuth2ApplicationByExternalReferenceCode(
					StringUtil.toUpperCase(customerName + "-ai-hub"),
					TestPropsValues.getCompanyId());

		Assert.assertNotNull(oAuth2Application);
		Assert.assertEquals("AI Hub", oAuth2Application.getName());
		Assert.assertEquals(
			Collections.singletonList(GrantType.CLIENT_CREDENTIALS),
			oAuth2Application.getAllowedGrantTypesList());
		Assert.assertEquals(
			serviceAccountUser.getUserId(),
			oAuth2Application.getClientCredentialUserId());
		Assert.assertEquals(
			provisioningRequest.getLiferayDXPURL(),
			oAuth2Application.getHomePageURL());
		Assert.assertEquals(
			Collections.singletonList(provisioningRequest.getLiferayDXPURL()),
			oAuth2Application.getRedirectURIsList());
	}

	private void _assertQuotaObjectEntry(
		ObjectDefinition objectDefinition, String externalReferenceCode) {

		ObjectEntry objectEntry = _objectEntryLocalService.fetchObjectEntry(
			externalReferenceCode, 0, objectDefinition.getObjectDefinitionId());

		Assert.assertNotNull(externalReferenceCode, objectEntry);

		Map<String, Serializable> values = objectEntry.getValues();

		Assert.assertEquals(
			33333333, GetterUtil.getInteger(values.get("limit")));
		Assert.assertEquals(0, GetterUtil.getInteger(values.get("usage")));
	}

	private static String _originalName;
	private static PermissionChecker _originalPermissionChecker;

	@Inject
	private static SiteInitializerRegistry _siteInitializerRegistry;

	@Inject
	private AccountEntryLocalService _accountEntryLocalService;

	@Inject
	private AccountEntryUserRelLocalService _accountEntryUserRelLocalService;

	@Inject
	private OAuth2ApplicationLocalService _oAuth2ApplicationLocalService;

	@Inject
	private ObjectDefinitionLocalService _objectDefinitionLocalService;

	@Inject
	private ObjectEntryLocalService _objectEntryLocalService;

	@Inject
	private UserLocalService _userLocalService;

}