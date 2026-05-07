/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayLabel from '@clayui/label';
import ClayPanel from '@clayui/panel';
import React from 'react';

import type {ContentSample} from '../types/ContentSample';

interface IProps {
	defaultExpanded?: boolean;
	sample: ContentSample;
}

export default function ContentSampleItem({defaultExpanded, sample}: IProps) {
	return (
		<ClayPanel
			className="content-site-generator-refine__sample"
			collapsable
			defaultExpanded={defaultExpanded}
			displayTitle={sample.title}
			displayType="unstyled"
			showCollapseIcon
		>
			<ClayPanel.Body>
				{sample.fields.length ? (
					sample.fields.map((field, index) => (
						<div className="form-group" key={index}>
							<label className="control-label">
								{field.label}
							</label>

							{field.type === 'text' && (
								<div className="form-control">
									{field.value}
								</div>
							)}

							{field.type === 'i18n' && (
								<div className="content-site-generator-refine__sample-i18n">
									{field.values.map((entry, valueIndex) => (
										<div
											className="content-site-generator-refine__sample-i18n-row"
											key={valueIndex}
										>
											<ClayLabel
												className="content-site-generator-refine__sample-i18n-label"
												displayType="info"
											>
												{entry.label}
											</ClayLabel>

											<div className="form-control">
												{entry.value}
											</div>
										</div>
									))}
								</div>
							)}

							{field.type === 'tags' && (
								<div className="content-site-generator-refine__sample-tags">
									{field.tags.map((tag, tagIndex) => (
										<ClayLabel
											displayType="secondary"
											key={tagIndex}
										>
											{tag}
										</ClayLabel>
									))}
								</div>
							)}
						</div>
					))
				) : (
					<p className="font-italic mb-0 text-secondary">
						{Liferay.Language.get('no-fields-to-preview')}
					</p>
				)}
			</ClayPanel.Body>
		</ClayPanel>
	);
}
