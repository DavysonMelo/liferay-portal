/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayIcon from '@clayui/icon';
import React from 'react';

interface FeedbackActionsRowProps {
	className?: string;
	onRegenerate?: () => void;
	onReport: () => void;
	onThumbsUp?: () => void;
	regenerateDisabled?: boolean;
	showRegenerate?: boolean;
}

function stopMouseDown(event: React.MouseEvent<HTMLButtonElement>) {
	event.stopPropagation();
}

const FeedbackActionsRow: React.FC<FeedbackActionsRowProps> = ({
	className,
	onRegenerate,
	onReport,
	onThumbsUp,
	regenerateDisabled = false,
	showRegenerate = false,
}) => {
	return (
		<div
			className={`ai-feedback-actions-row align-items-center d-inline-flex ${className ?? ''}`}
		>
			<button
				aria-label={Liferay.Language.get('good-response')}
				className="ai-feedback-actions-row__button"
				onClick={onThumbsUp}
				onMouseDown={stopMouseDown}
				title={Liferay.Language.get('good-response')}
				type="button"
			>
				<ClayIcon
					height={16}
					spritemap={Liferay.Icons.spritemap}
					symbol="thumbs-up"
					width={16}
				/>
			</button>

			<button
				aria-label={Liferay.Language.get('report-bad-result')}
				className="ai-feedback-actions-row__button"
				onClick={onReport}
				onMouseDown={stopMouseDown}
				title={Liferay.Language.get('report-bad-result')}
				type="button"
			>
				<ClayIcon
					height={16}
					spritemap={Liferay.Icons.spritemap}
					symbol="thumbs-down"
					width={16}
				/>
			</button>

			{showRegenerate && (
				<button
					aria-label={Liferay.Language.get('regenerate')}
					className="ai-feedback-actions-row__button"
					disabled={regenerateDisabled}
					onClick={onRegenerate}
					onMouseDown={stopMouseDown}
					title={Liferay.Language.get('regenerate')}
					type="button"
				>
					<ClayIcon
						height={16}
						spritemap={Liferay.Icons.spritemap}
						symbol="reset"
						width={16}
					/>
				</button>
			)}
		</div>
	);
};

export default FeedbackActionsRow;
