/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import React, {useState} from 'react';

import StepLayout from './components/StepLayout';
import {EXAMPLES} from './constants/examples';
import {SPRITEMAP} from './constants/spritemap';

interface IProps {
	refineStepURL?: string;
}

export default function IdeateStep({refineStepURL}: IProps) {
	const [prompt, setPrompt] = useState('');

	const hasText = !!prompt.trim().length;

	const handleAnalyze = () => {
		if (!refineStepURL) {
			return;
		}

		const url = new URL(refineStepURL, window.location.origin);

		url.searchParams.set('prompt', prompt);

		Liferay.Util.navigate(url.toString());
	};

	return (
		<StepLayout activeStep={0}>
			<div className="content-site-generator__title">
				<h2>{Liferay.Language.get('what-do-you-want-to-create')}</h2>

				<p className="text-secondary">
					{Liferay.Language.get(
						'describe-your-content-and-add-any-reference-materials-to-get-started'
					)}
				</p>
			</div>

			<textarea
				aria-label={Liferay.Language.get('describe-your-content')}
				className="content-site-generator__textarea form-control"
				onChange={(event) => setPrompt(event.target.value)}
				placeholder={Liferay.Language.get('prompt-example-placeholder')}
				rows={5}
				value={prompt}
			/>

			<div className="content-site-generator__actions">
				<ClayButton
					disabled={!hasText}
					displayType={hasText ? 'primary' : 'secondary'}
					onClick={handleAnalyze}
				>
					{Liferay.Language.get('analyze-and-configure')}

					<ClayIcon
						className="ml-2"
						spritemap={SPRITEMAP}
						symbol="magic"
					/>
				</ClayButton>
			</div>

			<div className="content-site-generator__examples">
				<p className="font-weight-semi-bold">
					{Liferay.Language.get('try-an-example')}
				</p>

				<ul className="list-group">
					{EXAMPLES.map((example, index) => (
						<li
							className="content-site-generator__example list-group-item"
							key={index}
							onClick={() => setPrompt(example.label)}
							onKeyDown={(event) => {
								if (
									event.key === 'Enter' ||
									event.key === ' '
								) {
									event.preventDefault();
									setPrompt(example.label);
								}
							}}
							role="button"
							tabIndex={0}
						>
							<ClayIcon
								className="mr-2 text-secondary"
								spritemap={SPRITEMAP}
								symbol={example.icon}
							/>

							{example.label}
						</li>
					))}
				</ul>
			</div>
		</StepLayout>
	);
}
