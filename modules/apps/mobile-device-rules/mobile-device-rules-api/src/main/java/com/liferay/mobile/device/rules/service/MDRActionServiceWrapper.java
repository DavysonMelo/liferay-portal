/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.mobile.device.rules.service;

import com.liferay.portal.kernel.service.ServiceWrapper;

/**
 * Provides a wrapper for {@link MDRActionService}.
 *
 * @author Edward C. Han
 * @see MDRActionService
 * @generated
 */
public class MDRActionServiceWrapper
	implements MDRActionService, ServiceWrapper<MDRActionService> {

	public MDRActionServiceWrapper() {
		this(null);
	}

	public MDRActionServiceWrapper(MDRActionService mdrActionService) {
		_mdrActionService = mdrActionService;
	}

	@Override
	public com.liferay.mobile.device.rules.model.MDRAction addAction(
			long ruleGroupInstanceId,
			java.util.Map<java.util.Locale, String> nameMap,
			java.util.Map<java.util.Locale, String> descriptionMap, String type,
			String typeSettings,
			com.liferay.portal.kernel.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException {

		return _mdrActionService.addAction(
			ruleGroupInstanceId, nameMap, descriptionMap, type, typeSettings,
			serviceContext);
	}

	@Override
	public com.liferay.mobile.device.rules.model.MDRAction addAction(
			long ruleGroupInstanceId,
			java.util.Map<java.util.Locale, String> nameMap,
			java.util.Map<java.util.Locale, String> descriptionMap, String type,
			com.liferay.portal.kernel.util.UnicodeProperties
				typeSettingsUnicodeProperties,
			com.liferay.portal.kernel.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException {

		return _mdrActionService.addAction(
			ruleGroupInstanceId, nameMap, descriptionMap, type,
			typeSettingsUnicodeProperties, serviceContext);
	}

	@Override
	public void deleteAction(long actionId)
		throws com.liferay.portal.kernel.exception.PortalException {

		_mdrActionService.deleteAction(actionId);
	}

	@Override
	public com.liferay.mobile.device.rules.model.MDRAction fetchAction(
			long actionId)
		throws com.liferay.portal.kernel.exception.PortalException {

		return _mdrActionService.fetchAction(actionId);
	}

	@Override
	public com.liferay.mobile.device.rules.model.MDRAction getAction(
			long actionId)
		throws com.liferay.portal.kernel.exception.PortalException {

		return _mdrActionService.getAction(actionId);
	}

	/**
	 * Returns the OSGi service identifier.
	 *
	 * @return the OSGi service identifier
	 */
	@Override
	public String getOSGiServiceIdentifier() {
		return _mdrActionService.getOSGiServiceIdentifier();
	}

	@Override
	public com.liferay.mobile.device.rules.model.MDRAction updateAction(
			long actionId, java.util.Map<java.util.Locale, String> nameMap,
			java.util.Map<java.util.Locale, String> descriptionMap, String type,
			String typeSettings,
			com.liferay.portal.kernel.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException {

		return _mdrActionService.updateAction(
			actionId, nameMap, descriptionMap, type, typeSettings,
			serviceContext);
	}

	@Override
	public com.liferay.mobile.device.rules.model.MDRAction updateAction(
			long actionId, java.util.Map<java.util.Locale, String> nameMap,
			java.util.Map<java.util.Locale, String> descriptionMap, String type,
			com.liferay.portal.kernel.util.UnicodeProperties
				typeSettingsUnicodeProperties,
			com.liferay.portal.kernel.service.ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException {

		return _mdrActionService.updateAction(
			actionId, nameMap, descriptionMap, type,
			typeSettingsUnicodeProperties, serviceContext);
	}

	@Override
	public MDRActionService getWrappedService() {
		return _mdrActionService;
	}

	@Override
	public void setWrappedService(MDRActionService mdrActionService) {
		_mdrActionService = mdrActionService;
	}

	private MDRActionService _mdrActionService;

}