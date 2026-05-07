/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayLabel from '@clayui/label';
import React from 'react';

import type {Entry} from '../types/Entry';
import type {Stat} from '../types/Stat';

const LANGUAGES = 'Spanish, Italian, French';

export const MOCK_ENTRIES: Entry[] = [
	{
		icon: 'folder',
		items: 60,
		language: LANGUAGES,
		title: 'Products',
		url: '/products/blog-article-1----spanish',
	},
	{
		icon: 'document',
		items: 1,
		language: LANGUAGES,
		title: 'Product',
		url: '/products/blog-article-1----german',
	},
	{
		icon: 'document',
		items: 1,
		language: LANGUAGES,
		title: 'Blogs',
		url: '/products/blog-article-1----english-(us)',
	},
	{
		icon: 'folder',
		items: 20,
		language: LANGUAGES,
		title: 'Blog Articles',
		url: '/products/blog-article-1----spanish',
	},
	{
		icon: 'document',
		items: 1,
		language: LANGUAGES,
		title: 'Blog Article',
		url: '/products/blog-article-1----german',
	},
	{
		icon: 'document',
		items: 1,
		language: LANGUAGES,
		title: 'Contact',
		url: '/products/blog-article-1----english-(us)',
	},
	{
		icon: 'folder',
		items: 30,
		language: LANGUAGES,
		title: 'Contact form',
		url: '/products/blog-article-1----german',
	},
];

export const MOCK_STATS: Stat[] = [
	{
		icon: 'document',
		label: Liferay.Language.get('total-items'),
		value: '155',
	},
	{
		icon: 'globe',
		label: Liferay.Language.get('languages'),
		value: '2',
	},
	{
		icon: 'document',
		label: Liferay.Language.get('status'),
		value: (
			<ClayLabel displayType="secondary">
				{Liferay.Language.get('draft').toUpperCase()}
			</ClayLabel>
		),
	},
];

export const MOCK_TOTAL_ENTRIES = 400;
