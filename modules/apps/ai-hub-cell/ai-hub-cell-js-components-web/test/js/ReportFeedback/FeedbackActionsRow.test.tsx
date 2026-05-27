/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import FeedbackActionsRow from '../../../src/main/resources/META-INF/resources/js/ReportFeedback/FeedbackActionsRow';

describe('FeedbackActionsRow', () => {
	it('invokes the thumbs-up and report callbacks on click', () => {
		const onReport = jest.fn();
		const onThumbsUp = jest.fn();

		render(
			<FeedbackActionsRow onReport={onReport} onThumbsUp={onThumbsUp} />
		);

		fireEvent.click(screen.getByRole('button', {name: 'good-response'}));

		expect(onThumbsUp).toHaveBeenCalledTimes(1);

		fireEvent.click(
			screen.getByRole('button', {name: 'report-bad-result'})
		);

		expect(onReport).toHaveBeenCalledTimes(1);
	});

	it('hides the regenerate button by default', () => {
		render(<FeedbackActionsRow onReport={jest.fn()} />);

		expect(
			screen.queryByRole('button', {name: 'regenerate'})
		).not.toBeInTheDocument();
	});

	it('renders a disabled regenerate button when requested', () => {
		render(
			<FeedbackActionsRow
				onRegenerate={jest.fn()}
				onReport={jest.fn()}
				regenerateDisabled
				showRegenerate
			/>
		);

		expect(screen.getByRole('button', {name: 'regenerate'})).toBeDisabled();
	});
});
