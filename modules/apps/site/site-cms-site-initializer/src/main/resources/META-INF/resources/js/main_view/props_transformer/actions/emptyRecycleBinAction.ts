/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {openToast} from 'frontend-js-components-web';
import {fetch} from 'frontend-js-web';

const emptyRecycleBin = async () => {
	const filter = encodeURIComponent(
		"cmsRoot eq true and (cmsSection eq 'contents' or cmsSection eq 'files') and status eq 8"
	);

	const response = await fetch(
		`/o/headless-cms/v1.0/bulk-action?filter=${filter}&nestedFields=embedded`,
		{
			body: JSON.stringify({
				selectAll: true,
				type: 'DeleteBulkAction',
			}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-csrf-token': Liferay.authToken,
			},
			method: 'POST',
		}
	);

	const entry = await response.json();

	openToast({
		message: Liferay.Util.sub(
			Liferay.Language.get(
				'x-items-were-permanently-deleted-from-the-recycle-bin'
			),
			entry.numberOfItems
		),
		type: 'success',
	});

	Liferay.fire('fds-update-display', {
		id: 'com.liferay.site.cms.site.initializer-recycleBinSection',
	});
};

export default emptyRecycleBin;
