<%
ViewAllTasksDisplayContext viewAllTasksDisplayContext = (ViewAllTasksDisplayContext)request.getAttribute(ViewAllTasksDisplayContext.class.getName());
%>

<div>
    <div>
		<react:component
			module="{Breadcrumb} from site-cms-site-initializer"
			props="<%= viewAllTasksDisplayContext.getBreadcrumbProps() %>"
		/>
	</div>

    <div class="cms-section custom-empty-state">
		<frontend-data-set:headless-display
			additionalProps="<%= viewAllTasksDisplayContext.getAdditionalProps() %>"
			apiURL="<%= viewAllTasksDisplayContext.getAPIURL() %>"
			bulkActionDropdownItems="<%= viewAllTasksDisplayContext.getBulkActionDropdownItems() %>"
			creationMenu="<%= viewAllTasksDisplayContext.getCreationMenu() %>"
			emptyState="<%= viewAllTasksDisplayContext.getEmptyState() %>"
			fdsActionDropdownItems="<%= viewAllTasksDisplayContext.getFDSActionDropdownItems() %>"
			formName="fm"
			id="<%= CMSSiteInitializerFDSNames.ALL_SECTION %>"
			itemsPerPage="<%= 20 %>"
			propsTransformer="{AssetsFilesDropFDSPropsTransformer} from site-cms-site-initializer"
			selectedItemsKey="embedded.id"
			selectionType="multiple"
			showSelectAll="<%= true %>"
			style="fluid"
		/>
	</div>
</div>