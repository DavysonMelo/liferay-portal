package com.liferay.ai.hub.web.internal.display.context;

import com.liferay.petra.string.StringBundler;
import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.model.Group;
import com.liferay.portal.kernel.model.GroupConstants;
import com.liferay.portal.kernel.service.GroupLocalService;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.Portal;
import com.liferay.portal.kernel.util.WebKeys;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

/**
 * @author Davyson Melo
 */
public class EditWorkflowDefinitionDisplayContext {

	public EditWorkflowDefinitionDisplayContext(
		GroupLocalService groupLocalService,
		HttpServletRequest httpServletRequest, Portal portal) {

		_groupLocalService = groupLocalService;

		_themeDisplay = (ThemeDisplay)httpServletRequest.getAttribute(
			WebKeys.THEME_DISPLAY);
	}

	public Map<String, Object> getReactData() throws Exception {
		Group group = _groupLocalService.getGroup(
			_themeDisplay.getScopeGroupId());

		Company company = _themeDisplay.getCompany();

		String aiHubURL = StringBundler.concat(
			company.getPortalURL(GroupConstants.DEFAULT_PARENT_GROUP_ID),
			"/web", group.getFriendlyURL());

		return HashMapBuilder.<String, Object>put(
			"backURL", aiHubURL + "/agent"
			).put(
				"title", LanguageUtil.get(_themeDisplay.getLocale(), "new-workflow-definition")
			).build();
	}

	private final GroupLocalService _groupLocalService;
	private final ThemeDisplay _themeDisplay;
}
