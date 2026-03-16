<%--
/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
--%>

<%@ include file="/init.jsp" %>

<%
ContentFieldDisplayContext contentFieldDisplayContext = (ContentFieldDisplayContext)request.getAttribute(ContentFieldDisplayContext.class.getName());
%>

<div>
    <div id="test12345">
        <react:component
            module="{ContentField} from site-cms-site-initializer"
            props="<%= contentFieldDisplayContext.getReactData() %>"
        />
    </div>
</div>

