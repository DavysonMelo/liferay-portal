/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, {useState} from 'react';

import GenerateStep from './GenerateStep';
import ReviewAndPublishStep from './ReviewAndPublishStep';
import StepLayout from './components/StepLayout';
import useStepNavigation from './hooks/useStepNavigation';

import type {SubStep} from './types/SubStep';

interface IProps {
	backURL?: string;
	initialSubStep?: SubStep;
	onBack?: () => void;
}

export default function ReviewStep({
	backURL,
	initialSubStep = 'generate',
	onBack,
}: IProps) {
	const [subStep, setSubStep] = useState<SubStep>(initialSubStep);

	const {handleBack} = useStepNavigation({backURL, onBack});

	return (
		<StepLayout activeStep={2}>
			{subStep === 'generate' ? (
				<GenerateStep
					onBack={handleBack}
					onCancel={handleBack}
					onContinue={() => setSubStep('review-and-publish')}
				/>
			) : (
				<ReviewAndPublishStep />
			)}
		</StepLayout>
	);
}
