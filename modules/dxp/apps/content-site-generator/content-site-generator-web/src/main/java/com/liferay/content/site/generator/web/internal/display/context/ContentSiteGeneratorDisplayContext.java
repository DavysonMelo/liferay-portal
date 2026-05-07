/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.content.site.generator.web.internal.display.context;

import com.liferay.portal.kernel.portlet.LiferayPortletResponse;
import com.liferay.portal.kernel.portlet.url.builder.PortletURLBuilder;

/**
 * @author Davyson Melo
 */
public class ContentSiteGeneratorDisplayContext {

	public ContentSiteGeneratorDisplayContext(
		LiferayPortletResponse liferayPortletResponse) {

		_liferayPortletResponse = liferayPortletResponse;
	}

	public String getBackURL() {
		return _buildURL(null);
	}

	public String getContentSiteGeneratorURL() {
		return _buildURL("/view_content_site_generator.jsp");
	}

	public String getRefineStepURL() {
		return _buildURL("/view_refine_step.jsp");
	}

	public String getReviewStepURL() {
		return _buildURL("/view_review_step.jsp");
	}

	private String _buildURL(String mvcPath) {
		if (mvcPath == null) {
			return PortletURLBuilder.createRenderURL(
				_liferayPortletResponse
			).buildString();
		}

		return PortletURLBuilder.createRenderURL(
			_liferayPortletResponse
		).setMVCPath(
			mvcPath
		).buildString();
	}

	private final LiferayPortletResponse _liferayPortletResponse;

}