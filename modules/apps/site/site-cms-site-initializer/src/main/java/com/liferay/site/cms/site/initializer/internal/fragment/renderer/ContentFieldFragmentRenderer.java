package com.liferay.site.cms.site.initializer.internal.fragment.renderer;

import com.liferay.fragment.renderer.FragmentRenderer;
import com.liferay.fragment.renderer.FragmentRendererContext;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.site.cms.site.initializer.internal.display.context.ContentFieldDisplayContext;
import jakarta.servlet.http.HttpServletRequest;
import org.osgi.service.component.annotations.Component;

import java.util.Map;

/**
 * @author Davyson Melo
 */
@Component(service = FragmentRenderer.class)
public class ContentFieldFragmentRenderer extends BaseJSPSectionFragmentRenderer<ContentFieldDisplayContext> {

	@Override
	public String getCollectionKey() {
		return "content=field";
	}

	@Override
	public String getLabelKey() {
		return "content-field";
	}

	@Override
	protected ContentFieldDisplayContext getDisplayContext(HttpServletRequest httpServletRequest)
		throws PortalException {
		return new ContentFieldDisplayContext(httpServletRequest);
	}

	@Override
	protected String getJSPPath() {
		return "/content_field.jsp";
	}
}
