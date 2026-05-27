/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.rest.internal.manager.v1_0;

import com.liferay.account.model.AccountEntry;
import com.liferay.ai.hub.rest.dto.v1_0.Report;
import com.liferay.ai.hub.rest.manager.v1_0.ReportManager;
import com.liferay.ai.hub.util.AccountEntryUtil;
import com.liferay.object.model.ObjectDefinition;
import com.liferay.object.model.ObjectEntry;
import com.liferay.object.model.ObjectRelationship;
import com.liferay.object.service.ObjectDefinitionLocalService;
import com.liferay.object.service.ObjectEntryLocalService;
import com.liferay.object.service.ObjectRelationshipLocalService;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.vulcan.dto.converter.DTOConverterContext;

import java.util.Map;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Fábio Alves
 */
@Component(service = ReportManager.class)
public class ReportManagerImpl implements ReportManager {

	@Override
	public Report postReport(
			Company company, DTOConverterContext dtoConverterContext,
			Report report)
		throws Exception {

		AccountEntry accountEntry = AccountEntryUtil.getUserAccountEntry(
			dtoConverterContext.getUserId());

		ObjectDefinition reportObjectDefinition =
			_objectDefinitionLocalService.getObjectDefinition(
				company.getCompanyId(), "AIHubReport");

		ObjectEntry objectEntry = _objectEntryLocalService.addObjectEntry(
			0, dtoConverterContext.getUserId(),
			reportObjectDefinition.getObjectDefinitionId(), 0, null,
			Map.of(
				"level", _computeLevel(report.getReason()),
				"r_accountToAIHubReports_accountEntryId",
				accountEntry.getAccountEntryId(), "feedback",
				GetterUtil.getString(report.getFeedback()), "reason",
				GetterUtil.getString(report.getReason()), "surface",
				GetterUtil.getString(report.getSurface()), "userMessage",
				GetterUtil.getString(report.getUserMessage())),
			new ServiceContext());

		ObjectDefinition agentDefinitionObjectDefinition =
			_objectDefinitionLocalService.getObjectDefinition(
				company.getCompanyId(), "AIHubAgentDefinition");

		ObjectRelationship objectRelationship =
			_objectRelationshipLocalService.getObjectRelationship(
				agentDefinitionObjectDefinition.getObjectDefinitionId(),
				"aiHubAgentDefinitionsToAIHubReports");

		for (String agentDefinitionExternalReferenceCode :
				report.getAgentDefinitionExternalReferenceCodes()) {

			ObjectEntry agentDefinitionObjectEntry =
				_objectEntryLocalService.getObjectEntry(
					agentDefinitionExternalReferenceCode, 0L,
					agentDefinitionObjectDefinition.getObjectDefinitionId());

			_objectRelationshipLocalService.
				addObjectRelationshipMappingTableValues(
					dtoConverterContext.getUserId(),
					objectRelationship.getObjectRelationshipId(),
					agentDefinitionObjectEntry.getObjectEntryId(),
					objectEntry.getObjectEntryId(), new ServiceContext());
		}

		return new Report() {
			{
				setAgentDefinitionExternalReferenceCodes(
					report::getAgentDefinitionExternalReferenceCodes);
				setChatbotExternalReferenceCode(
					report::getChatbotExternalReferenceCode);
				setDateCreated(objectEntry::getCreateDate);
				setExternalReferenceCode(objectEntry::getExternalReferenceCode);
				setFeedback(report::getFeedback);
				setId(objectEntry::getObjectEntryId);
				setLevel(() -> _computeLevel(report.getReason()));
				setReason(report::getReason);
				setSurface(report::getSurface);
				setUserMessage(report::getUserMessage);
			}
		};
	}

	private String _computeLevel(String reason) {
		if (Validator.isNull(reason)) {
			return "low";
		}

		if (reason.equals("piiExposure") || reason.equals("harmfulContent")) {
			return "critical";
		}

		if (reason.equals("incorrect")) {
			return "high";
		}

		if (reason.equals("agentError")) {
			return "medium";
		}

		return "low";
	}

	@Reference
	private ObjectDefinitionLocalService _objectDefinitionLocalService;

	@Reference
	private ObjectEntryLocalService _objectEntryLocalService;

	@Reference
	private ObjectRelationshipLocalService _objectRelationshipLocalService;

}