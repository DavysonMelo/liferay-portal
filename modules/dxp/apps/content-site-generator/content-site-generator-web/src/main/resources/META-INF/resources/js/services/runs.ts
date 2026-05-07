/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {fetch as liferayFetch} from 'frontend-js-web';

import type {Run} from '../types/Run';

export const RUNS_URL = '/o/content-site-generator/runs';

interface CreateRunInput {
	name: string;
	prompt: string;
	runStatus?: string;
}

export async function analyzeRun(runId: number): Promise<void> {
	const response = await liferayFetch(
		`${RUNS_URL}/${runId}/object-actions/analyze`,
		{
			headers: {'Content-Type': 'application/json'},
			method: 'PUT',
		}
	);

	if (!response.ok) {
		throw new Error(`Unable to analyze run ${runId}`);
	}
}

export async function commitRun(runId: number): Promise<void> {
	const response = await liferayFetch(
		`${RUNS_URL}/${runId}/object-actions/commit`,
		{
			headers: {'Content-Type': 'application/json'},
			method: 'PUT',
		}
	);

	if (!response.ok) {
		throw new Error(`Unable to commit run ${runId}`);
	}
}

export async function createRun(input: CreateRunInput): Promise<Run> {
	const response = await liferayFetch(RUNS_URL, {
		body: JSON.stringify(input),
		headers: {'Content-Type': 'application/json'},
		method: 'POST',
	});

	if (!response.ok) {
		throw new Error('Unable to create run');
	}

	return response.json();
}

export async function deleteRun(runId: number): Promise<void> {
	const response = await liferayFetch(`${RUNS_URL}/${runId}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		throw new Error(`Unable to delete run ${runId}`);
	}
}

export async function getRun(runId: number): Promise<Run> {
	const response = await liferayFetch(`${RUNS_URL}/${runId}`);

	if (!response.ok) {
		throw new Error(`Unable to fetch run ${runId}`);
	}

	return response.json();
}

export async function patchRun(
	runId: number,
	updates: Partial<Run>
): Promise<void> {
	const response = await liferayFetch(`${RUNS_URL}/${runId}`, {
		body: JSON.stringify(updates),
		headers: {'Content-Type': 'application/json'},
		method: 'PATCH',
	});

	if (!response.ok) {
		throw new Error(`Unable to update run ${runId}`);
	}
}
