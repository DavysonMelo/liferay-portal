/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {sub} from 'frontend-js-web';

import type {ContentSample} from '../types/ContentSample';
import type {DetectedConfigItem} from '../types/DetectedConfigItem';
import type {GeneratedItem} from '../types/GeneratedItem';
import type {SummaryItem} from '../types/SummaryItem';
import type {Template} from '../types/Template';

export const MOCK_ATTACHMENTS = ['image (2).png', 'image (4).png'];

export const MOCK_CONTENT_SAMPLES: ContentSample[] = [
	{
		fields: [
			{
				label: 'SEO Title',
				type: 'text',
				value: 'Premium Your content Products | Buy Online',
			},
			{
				label: 'Meta Description',
				type: 'text',
				value: 'Shop our selection of high-quality your content products. Fast shipping, competitive prices, and excellent customer service.',
			},
			{label: 'URL', type: 'text', value: '/products/your-content'},
			{
				label: 'H1 Heading',
				type: 'text',
				value: 'Your content Products',
			},
			{
				label: 'Excerpt',
				type: 'text',
				value: 'Explore our curated collection of your content products designed for performance and durability.',
			},
		],
		tags: [
			'Product Name',
			'SEO Title',
			'Meta Description',
			'Price',
			'SKU',
			'Description',
			'Features',
			'Specifications',
			'Images',
			'Stock Status',
		],
		title: 'Product Page - Spanish',
	},
	{fields: [], tags: [], title: 'Product Page - English'},
	{fields: [], tags: [], title: 'Blog Article - Spanish'},
	{fields: [], tags: [], title: 'Blog Article - English'},
];

export const MOCK_DETECTED_CONFIG: DetectedConfigItem[] = [
	{
		label: Liferay.Language.get('languages'),
		value: 'English (US), Spanish',
	},
	{
		label: Liferay.Language.get('reference-documents'),
		value: sub(Liferay.Language.get('x-files'), 2),
	},
];

export const MOCK_GENERATED_ITEMS: GeneratedItem[] = [
	{
		description: '(15 pages × 2 languages)',
		title: '30 complete content entries',
	},
	{
		description:
			'including titles, descriptions, keywords, and structured data',
		title: 'SEO-optimized metadata',
	},
	{
		description: 'with content for: English (US), Spanish (SP)',
		title: 'Multi-language support',
	},
	{
		description: 'optimized for each content type',
		title: 'Layout-specific structures',
	},
	{
		description: 'and canonical URLs for each page',
		title: 'URL structures',
	},
	{
		description: 'for enhanced search engine visibility',
		title: 'Schema.org markup',
	},
];

export const MOCK_PROMPT =
	'Generate 10 product pages with detailed specifications, also 10 blogs in spanish and english';

export const MOCK_SUMMARY: SummaryItem[] = [
	{
		icon: 'document',
		title: Liferay.Language.get('total-pages'),
		value: 60,
	},
	{
		icon: 'automatic-translate',
		title: Liferay.Language.get('languages'),
		value: 3,
	},
	{
		icon: 'stars',
		title: Liferay.Language.get('templates'),
		value: 3,
	},
	{
		icon: 'document',
		title: Liferay.Language.get('total-entries'),
		value: 180,
	},
];

export const MOCK_TEMPLATES: Template[] = [
	{
		entries: 60,
		icon: 'shopping-cart',
		labels: [
			{text: '3 Languages', type: 'success'},
			{text: '20 Pages', type: 'info'},
		],
		name: 'Product Page',
	},
	{
		entries: 60,
		icon: 'polls',
		labels: [
			{text: '3 Languages', type: 'success'},
			{text: '20 Pages', type: 'info'},
		],
		name: 'Comparison Page',
	},
	{
		entries: 60,
		icon: 'document-text',
		labels: [
			{text: '3 Languages', type: 'success'},
			{text: '20 Pages', type: 'info'},
		],
		name: 'Blog Article',
	},
];
