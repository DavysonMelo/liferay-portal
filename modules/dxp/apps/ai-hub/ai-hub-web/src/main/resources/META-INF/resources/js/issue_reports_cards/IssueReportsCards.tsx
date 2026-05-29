/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import Icon from '@clayui/icon';
import React from 'react';

interface IssueReportsCardsProps {
	criticalIssuesCount: number;
	criticalIssuesLabel: string;
	dislikeRatingLabel: string;
	dislikeRatingPercent: number;
	positiveRatingLabel: string;
	positiveRatingPercent: number;
	userActivityLabel: string;
}

interface CardProps {
	label: string;
	symbol: string;
	value: string;
}

function Card({label, symbol, value}: CardProps) {
	return (
		<div className="card h-100">
			<div className="align-items-start card-body d-flex justify-content-between">
				<div>
					<p className="mb-2 text-secondary">{label}</p>

					<p className="h2 mb-0">{value}</p>
				</div>

				<span className="sticker sticker-primary">
					<Icon symbol={symbol} />
				</span>
			</div>
		</div>
	);
}

export default function IssueReportsCards({
	criticalIssuesCount,
	criticalIssuesLabel,
	dislikeRatingLabel,
	dislikeRatingPercent,
	positiveRatingLabel,
	positiveRatingPercent,
	userActivityLabel,
}: IssueReportsCardsProps) {
	return (
		<section className="container-fluid issue-reports-user-activity mb-4">
			<h2 className="h4 mb-3">{userActivityLabel}</h2>

			<div className="row">
				<div className="col-12 col-md-4 mb-3">
					<Card
						label={positiveRatingLabel}
						symbol="thumbs-up"
						value={`${positiveRatingPercent}%`}
					/>
				</div>

				<div className="col-12 col-md-4 mb-3">
					<Card
						label={dislikeRatingLabel}
						symbol="thumbs-down"
						value={`${dislikeRatingPercent}%`}
					/>
				</div>

				<div className="col-12 col-md-4 mb-3">
					<Card
						label={criticalIssuesLabel}
						symbol="exclamation-full"
						value={String(criticalIssuesCount)}
					/>
				</div>
			</div>
		</section>
	);
}
