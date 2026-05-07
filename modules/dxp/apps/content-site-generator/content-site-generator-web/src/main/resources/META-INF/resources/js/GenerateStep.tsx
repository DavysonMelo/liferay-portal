/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayIcon from '@clayui/icon';
import ClayLabel from '@clayui/label';
import React from 'react';

import StepActions from './components/StepActions';
import {SPRITEMAP} from './constants/spritemap';
import useStepNavigation from './hooks/useStepNavigation';
import {MOCK_STATS, MOCK_TASKS} from './mocks/generateStep';

interface IProps {
	backURL?: string;
	cancelURL?: string;
	continueURL?: string;
	onBack?: () => void;
	onCancel?: () => void;
	onContinue?: () => void;
}

export default function GenerateStep({
	backURL,
	cancelURL,
	continueURL,
	onBack,
	onCancel,
	onContinue,
}: IProps) {
	const {handleBack, handleCancel, handleContinue} = useStepNavigation({
		backURL,
		cancelURL,
		continueURL,
		onBack,
		onCancel,
		onContinue,
	});

	return (
		<div className="content-site-generator__generate">
			<h3 className="content-site-generator__section-title">
				{Liferay.Language.get('generate')}
			</h3>

			<div className="content-site-generator__stats">
				{MOCK_STATS.map((stat, index) => (
					<div className="content-site-generator__stat" key={index}>
						<div className="content-site-generator__stat-label">
							<ClayIcon
								className="mr-2 text-secondary"
								spritemap={SPRITEMAP}
								symbol={stat.icon}
							/>

							{stat.label}
						</div>

						<div className="content-site-generator__stat-value">
							{stat.value}
						</div>
					</div>
				))}
			</div>

			<ul className="content-site-generator__tasks list-unstyled">
				{MOCK_TASKS.map((task, index) => (
					<li
						className={`content-site-generator__task content-site-generator__task--${task.status}`}
						key={index}
					>
						<div className="content-site-generator__task-header">
							<span className="content-site-generator__task-bullet">
								{task.status === 'completed' && (
									<ClayIcon
										spritemap={SPRITEMAP}
										symbol="check-circle-full"
									/>
								)}

								{task.status === 'in-progress' && (
									<span className="content-site-generator__task-bullet--in-progress" />
								)}

								{task.status === 'pending' && (
									<span className="content-site-generator__task-bullet--pending" />
								)}
							</span>

							<span className="content-site-generator__task-label">
								{task.label}
							</span>

							{task.status !== 'pending' && (
								<ClayLabel
									displayType={
										task.status === 'completed'
											? 'success'
											: 'info'
									}
								>
									{`${task.progress}%`}
								</ClayLabel>
							)}
						</div>

						{task.status !== 'pending' && (
							<div className="content-site-generator__task-progress">
								<div className="progress">
									<div
										className={`progress-bar ${
											task.status === 'completed'
												? 'bg-success'
												: 'bg-primary'
										}`}
										style={{width: `${task.progress}%`}}
									/>
								</div>

								<span className="content-site-generator__task-progress-end">
									{task.status === 'completed' ? (
										<ClayIcon
											className="text-success"
											spritemap={SPRITEMAP}
											symbol="check-circle"
										/>
									) : (
										`${task.progress}%`
									)}
								</span>
							</div>
						)}
					</li>
				))}
			</ul>

			<StepActions
				backLabel={Liferay.Util.sub(
					Liferay.Language.get('back-to-x'),
					Liferay.Language.get('refine')
				)}
				onBack={handleBack}
				onCancel={handleCancel}
				onContinue={handleContinue}
			/>
		</div>
	);
}
