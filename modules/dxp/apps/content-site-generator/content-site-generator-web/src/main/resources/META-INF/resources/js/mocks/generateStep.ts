/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import type {Stat} from '../types/Stat';
import type {Task} from '../types/Task';

export const MOCK_STATS: Stat[] = [
	{
		icon: 'document',
		label: Liferay.Language.get('content-entries'),
		value: '4 / 150',
	},
	{
		icon: 'magic',
		label: Liferay.Language.get('content-pages'),
		value: '5',
	},
	{
		icon: 'globe',
		label: Liferay.Language.get('languages'),
		value: '3',
	},
];

export const MOCK_TASKS: Task[] = [
	{
		label: Liferay.Language.get('analyzing-reference-documents'),
		progress: 100,
		status: 'completed',
	},
	{
		label: Liferay.Language.get('extracting-key-topics-and-features'),
		progress: 100,
		status: 'completed',
	},
	{
		label: Liferay.Language.get('generating-contents'),
		progress: 10,
		status: 'in-progress',
	},
	{
		label: Liferay.Language.get('generating-content-pages'),
		progress: 0,
		status: 'pending',
	},
	{
		label: Liferay.Language.get('localizing-to-target-languages'),
		progress: 0,
		status: 'pending',
	},
];
