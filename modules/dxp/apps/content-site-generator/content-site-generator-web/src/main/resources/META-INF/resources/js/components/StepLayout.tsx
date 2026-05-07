/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayLayout from '@clayui/layout';
import React from 'react';

import {WIZARD_STEPS} from '../constants/wizardSteps';
import MultiStepProgress from './MultiStepProgress';

interface IProps {
	activeStep: number;
	children: React.ReactNode;
}

export default function StepLayout({activeStep, children}: IProps) {
	return (
		<div className="content-site-generator">
			<ClayLayout.ContainerFluid view>
				<ClayLayout.Row justify="center">
					<ClayLayout.Col md={10} xl={8}>
						<div className="content-site-generator__progress">
							<MultiStepProgress
								activeStep={activeStep}
								steps={WIZARD_STEPS}
							/>
						</div>

						{children}
					</ClayLayout.Col>
				</ClayLayout.Row>
			</ClayLayout.ContainerFluid>
		</div>
	);
}
