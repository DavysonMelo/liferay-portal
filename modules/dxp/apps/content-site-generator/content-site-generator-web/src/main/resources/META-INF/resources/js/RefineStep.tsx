/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayAlert from '@clayui/alert';
import ClayLabel from '@clayui/label';
import ClayPanel from '@clayui/panel';
import {sub} from 'frontend-js-web';
import React, {useState} from 'react';

import ContentPreviewForm from './components/ContentPreviewForm';
import StepActions from './components/StepActions';
import StepLayout from './components/StepLayout';
import useStepNavigation from './hooks/useStepNavigation';
import {
	MOCK_ATTACHMENTS,
	MOCK_CONTENT_SAMPLES,
	MOCK_DETECTED_CONFIG,
	MOCK_GENERATED_ITEMS,
	MOCK_PROMPT,
	MOCK_SUMMARY,
	MOCK_TEMPLATES,
} from './mocks/refineStep';

import type {ContentSample} from './types/ContentSample';
import type {DetectedConfigItem} from './types/DetectedConfigItem';
import type {GeneratedItem} from './types/GeneratedItem';
import type {SummaryItem} from './types/SummaryItem';
import type {Template} from './types/Template';

const URL_PROMPT = new URLSearchParams(window.location.search).get('prompt');

interface IProps {
	attachments?: string[];
	backURL?: string;
	cancelURL?: string;
	contentSamples?: ContentSample[];
	continueURL?: string;
	detectedConfig?: DetectedConfigItem[];
	generatedItems?: GeneratedItem[];
	onBack?: () => void;
	onCancel?: () => void;
	onContinue?: () => void;
	prompt?: string;
	summary?: SummaryItem[];
	templates?: Template[];
}

export default function RefineStep({
	attachments = MOCK_ATTACHMENTS,
	backURL,
	cancelURL,
	contentSamples = MOCK_CONTENT_SAMPLES,
	continueURL,
	detectedConfig = MOCK_DETECTED_CONFIG,
	generatedItems = MOCK_GENERATED_ITEMS,
	onBack,
	onCancel,
	onContinue,
	prompt = URL_PROMPT ?? MOCK_PROMPT,
	summary = MOCK_SUMMARY,
	templates = MOCK_TEMPLATES,
}: IProps) {
	const [showTip, setShowTip] = useState(true);

	const {handleBack, handleCancel, handleContinue} = useStepNavigation({
		backURL,
		cancelURL,
		continueURL,
		onBack,
		onCancel,
		onContinue,
	});

	return (
		<StepLayout activeStep={1}>
			<div className="content-site-generator-refine">
				<div className="content-site-generator-refine__header">
					<h3>
						{Liferay.Language.get(
							'preview-content-to-be-generated'
						)}
					</h3>

					<p className="text-secondary">
						{Liferay.Language.get(
							'review-the-configuration-and-content-samples-before-generating'
						)}
					</p>
				</div>

				<ClayPanel
					className="content-site-generator-refine__section"
					displayType="secondary"
				>
					<ClayPanel.Body>
						<h4 className="content-site-generator-refine__section-title">
							{Liferay.Language.get('your-prompt')}
						</h4>

						{prompt && (
							<>
								<p className="content-site-generator-refine__prompt">
									{`"${prompt}"`}
								</p>

								<div className="dropdown-divider" />

								<p className="content-site-generator-refine__attachments-label text-secondary">
									{attachments.length
										? sub(
												Liferay.Language.get(
													'attached-files-x'
												),
												attachments.length
											)
										: Liferay.Language.get(
												'attached-files'
											)}
								</p>

								{attachments.length ? (
									<div className="content-site-generator-refine__attachments">
										{attachments.map(
											(file: string, index: number) => (
												<ClayLabel
													displayType="secondary"
													key={index}
												>
													{file}
												</ClayLabel>
											)
										)}
									</div>
								) : (
									<p className="font-italic text-secondary">
										{Liferay.Language.get(
											'no-files-attached'
										)}
									</p>
								)}
							</>
						)}
					</ClayPanel.Body>
				</ClayPanel>

				<ContentPreviewForm
					contentSamples={contentSamples}
					detectedConfig={detectedConfig}
					generatedItems={generatedItems}
					summary={summary}
					templates={templates}
				/>

				{showTip && (
					<ClayAlert
						className="content-site-generator-refine__tip"
						displayType="info"
						onClose={() => setShowTip(false)}
						title={Liferay.Language.get('tip')}
					>
						{Liferay.Language.get(
							'use-the-chat-on-the-left-to-refine-your-requirements-before-generating-you-can-ask-to-add-more-pages-change-layouts-or-adjust-any-configuration'
						)}
					</ClayAlert>
				)}

				<StepActions
					backLabel={Liferay.Language.get('back-to-prompt')}
					onBack={handleBack}
					onCancel={handleCancel}
					onContinue={handleContinue}
				/>
			</div>
		</StepLayout>
	);
}
