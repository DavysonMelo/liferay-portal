/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from '@clayui/button';
import ClayModal from '@clayui/modal';
import React from 'react';

import emptyRecycleBin from '../props_transformer/actions/emptyRecycleBinAction';

export default function EmptyRecycleBinModalContent({
	closeModal,
}: {
	closeModal: () => void;
}) {
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			emptyRecycleBin();

			Liferay.fire('fds-update-display', {
				id: 'com.liferay.site.cms.site.initializer-recycleBinSection',
			});
		}
		finally {
			closeModal();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<ClayModal.Header>
				{Liferay.Language.get('empty-recycle-bin')}
			</ClayModal.Header>

			<ClayModal.Body>
				<p>
					{Liferay.Language.get(
						'this-will-permanently-delete-all-items-in-the-recycle-bin.-this-action-cannot-be-undone.-are-you-sure-you-want-to-proceed'
					)}
				</p>
			</ClayModal.Body>

			<ClayModal.Footer
				last={
					<ClayButton.Group spaced>
						<ClayButton
							displayType="secondary"
							onClick={closeModal}
						>
							{Liferay.Language.get('cancel')}
						</ClayButton>

						<ClayButton displayType="danger" type="submit">
							{Liferay.Language.get('empty-bin')}
						</ClayButton>
					</ClayButton.Group>
				}
			></ClayModal.Footer>
		</form>
	);
}
