package com.liferay.site.cms.site.initializer.internal.display.context;

import com.liferay.portal.kernel.editor.configuration.EditorConfiguration;
import com.liferay.portal.kernel.editor.configuration.EditorConfigurationFactoryUtil;
import com.liferay.portal.kernel.portlet.RequestBackedPortletURLFactoryUtil;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.WebKeys;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

public class ContentFieldDisplayContext {

	public ContentFieldDisplayContext(HttpServletRequest httpServletRequest) {
		_httpServletRequest = httpServletRequest;
	}

	public Object getEditorConfig() {

		ThemeDisplay themeDisplay =
				(ThemeDisplay)_httpServletRequest.getAttribute(
						WebKeys.THEME_DISPLAY);

		EditorConfiguration editorConfiguration =
				EditorConfigurationFactoryUtil.getEditorConfiguration(
						themeDisplay.getPpid(), "rich_text", "ckeditor5_classic",
						HashMapBuilder.<String, Object>put(
								"liferay-ui:input-editor:allowBrowseDocuments", true
						).put(
								"liferay-ui:input-editor:name", "richTextDefaultValue"
						).build(),
						themeDisplay,
						RequestBackedPortletURLFactoryUtil.create(_httpServletRequest));

		Map<String, Object> data = editorConfiguration.getData();

		return data.get("editorConfig");
	}

	public Map<String, Object> getReactData() throws Exception {

		return HashMapBuilder.<String, Object>put(
			"ckEditor5Config", getEditorConfig()
		).build();
	}

	private final HttpServletRequest _httpServletRequest;
}
