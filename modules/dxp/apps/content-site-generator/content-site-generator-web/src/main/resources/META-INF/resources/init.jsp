<%--
/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
--%>

<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %><%@
taglib uri="http://liferay.com/tld/frontend" prefix="liferay-frontend" %><%@
taglib uri="http://liferay.com/tld/react" prefix="react" %><%@
taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %><%@
taglib uri="http://liferay.com/tld/util" prefix="liferay-util" %>

<%@ page import="com.liferay.content.site.generator.web.internal.display.context.ContentSiteGeneratorDisplayContext" %><%@
page import="com.liferay.portal.kernel.util.HashMapBuilder" %>

<liferay-frontend:defineObjects />

<liferay-util:html-top>
	<aui:link hashedFile="<%= true %>" href="content-site-generator-web/css/main.css" rel="stylesheet" type="text/css" />
</liferay-util:html-top>

<liferay-theme:defineObjects />

<%
ContentSiteGeneratorDisplayContext contentSiteGeneratorDisplayContext = (ContentSiteGeneratorDisplayContext)request.getAttribute(ContentSiteGeneratorDisplayContext.class.getName());
%>