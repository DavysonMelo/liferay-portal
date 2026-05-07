/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

export type ContentSampleField =
	| {
			label: string;
			type: 'text';
			value: string;
	  }
	| {
			label: string;
			type: 'i18n';
			values: Array<{label: string; value: string}>;
	  }
	| {
			label: string;
			tags: string[];
			type: 'tags';
	  };

export type ContentSample = {
	fields: ContentSampleField[];
	tags: string[];
	title: string;
};
