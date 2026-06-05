/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.web.internal.display.context;

import com.liferay.ai.hub.web.internal.frontend.data.set.sort.IssueReportFDSSorts;
import com.liferay.frontend.data.set.model.FDSSortItemList;
import com.liferay.object.model.ObjectDefinition;
import com.liferay.object.rest.manager.v1_0.ObjectEntryManager;
import com.liferay.object.service.ObjectDefinitionLocalService;
import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.vulcan.aggregation.Aggregation;
import com.liferay.portal.vulcan.aggregation.Facet;
import com.liferay.portal.vulcan.dto.converter.DefaultDTOConverterContext;
import com.liferay.portal.vulcan.pagination.Page;
import com.liferay.portal.vulcan.pagination.Pagination;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

/**
 * @author Davyson Melo
 */
public class ViewIssueReportsDisplayContext {

	public ViewIssueReportsDisplayContext(
		HttpServletRequest httpServletRequest,
		ObjectDefinitionLocalService objectDefinitionLocalService,
		ObjectEntryManager objectEntryManager) {

		_httpServletRequest = httpServletRequest;
		_objectDefinitionLocalService = objectDefinitionLocalService;
		_objectEntryManager = objectEntryManager;

		_themeDisplay = (ThemeDisplay)httpServletRequest.getAttribute(
			WebKeys.THEME_DISPLAY);
	}

	public String getAPIURL() {
		return "/o/ai-hub/reports?nestedFields=" +
			"aiHubAgentDefinitionsToAIHubReports";
	}

	public Map<String, Object> getCardsReactData() throws Exception {
		long companyId = _themeDisplay.getCompanyId();

		ObjectDefinition objectDefinition =
			_objectDefinitionLocalService.
				fetchObjectDefinitionByExternalReferenceCode(
					_OBJECT_DEFINITION_ERC, companyId);

		long criticalCount = 0;
		long negativeCount = 0;
		long positiveCount = 0;
		long total = 0;

		if (objectDefinition != null) {
			Aggregation aggregation = new Aggregation();

			aggregation.setAggregationTerms(
				HashMapBuilder.put(
					"feedback", "feedback"
				).put(
					"level", "level"
				).build());

			Page<?> page = _objectEntryManager.getObjectEntries(
				companyId, objectDefinition, null, aggregation,
				new DefaultDTOConverterContext(
					false, null, null, _httpServletRequest, null,
					_themeDisplay.getLocale(), null, _themeDisplay.getUser()),
				null, Pagination.of(1, 1), null, null);

			total = page.getTotalCount();

			criticalCount = _getFacetCount(page, "level", "critical");

			negativeCount = _getFacetCount(page, "feedback", "negative");

			positiveCount = total - negativeCount;
		}

		return HashMapBuilder.<String, Object>put(
			"criticalIssuesCount", criticalCount
		).put(
			"criticalIssuesLabel",
			LanguageUtil.get(_httpServletRequest, "critical-issues")
		).put(
			"dislikeRatingLabel",
			LanguageUtil.get(_httpServletRequest, "dislike-rating")
		).put(
			"dislikeRatingPercent", _percent(negativeCount, total)
		).put(
			"positiveRatingLabel",
			LanguageUtil.get(_httpServletRequest, "positive-rating")
		).put(
			"positiveRatingPercent", _percent(positiveCount, total)
		).put(
			"userActivityLabel",
			LanguageUtil.get(_httpServletRequest, "user-activity")
		).build();
	}

	public FDSSortItemList getFDSSortItems() {
		return IssueReportFDSSorts.getItems(_httpServletRequest);
	}

	public ThemeDisplay getThemeDisplay() {
		return _themeDisplay;
	}

	private long _getFacetCount(
		Page<?> page, String facetCriteria, String term) {

		for (Facet facet : page.getFacets()) {
			if (!facetCriteria.equals(facet.getFacetCriteria())) {
				continue;
			}

			for (Facet.FacetValue facetValue : facet.getFacetValues()) {
				if (term.equals(facetValue.getTerm())) {
					return facetValue.getNumberOfOccurrences();
				}
			}
		}

		return 0;
	}

	private int _percent(long count, long total) {
		if (total == 0) {
			return 0;
		}

		return (int)Math.round((count * 100.0) / total);
	}

	private static final String _OBJECT_DEFINITION_ERC = "L_AI_HUB_REPORT";

	private final HttpServletRequest _httpServletRequest;
	private final ObjectDefinitionLocalService _objectDefinitionLocalService;
	private final ObjectEntryManager _objectEntryManager;
	private final ThemeDisplay _themeDisplay;

}