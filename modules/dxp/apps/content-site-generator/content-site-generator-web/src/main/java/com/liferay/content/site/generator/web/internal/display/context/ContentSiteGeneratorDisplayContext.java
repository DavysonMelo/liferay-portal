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
		return PortletURLBuilder.createRenderURL(
			_liferayPortletResponse
		).buildString();
	}

	public String getContentSiteGeneratorURL() {
		return PortletURLBuilder.createRenderURL(
			_liferayPortletResponse
		).buildString();
	}

	public String getRefineStepURL() {
		return PortletURLBuilder.createRenderURL(
			_liferayPortletResponse
		).setMVCPath(
			"/view_refine_step.jsp"
		).buildString();
	}

	public String getReviewStepURL() {
		return PortletURLBuilder.createRenderURL(
			_liferayPortletResponse
		).setMVCPath(
			"/view_review_step.jsp"
		).buildString();
	}

	private final LiferayPortletResponse _liferayPortletResponse;

}
