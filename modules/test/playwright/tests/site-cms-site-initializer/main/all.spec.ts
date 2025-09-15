/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {expect, mergeTests} from '@playwright/test';
import {readFileSync} from 'fs';
import path from 'path';

import {dataApiHelpersTest} from '../../../fixtures/dataApiHelpersTest';
import {featureFlagsTest} from '../../../fixtures/featureFlagsTest';
import {loginTest} from '../../../fixtures/loginTest';
import getRandomString from '../../../utils/getRandomString';
import {cmsPagesTest} from './fixtures/cmsPagesTest';

const test = mergeTests(
	cmsPagesTest,
	dataApiHelpersTest,
	featureFlagsTest({
		'LPD-17564': {enabled: true},
		'LPS-179669': {enabled: true},
	}),
	loginTest()
);

test('Can delete multiple contents across spaces with and without recycle bin enabled', async ({
	apiHelpers,
	assetsPage,
	page,
	recycleBinPage,
}) => {
	const applicationName = 'cms/basic-web-contents';
	const spaceNameWithRecycleBin = `Space ${getRandomString()}`;
	const spaceNameWithoutRecycleBin = `Space ${getRandomString()}`;
	const file1Title = `title ${getRandomString()}`;
	const file2Title = `title ${getRandomString()}`;

	await apiHelpers.headlessAssetLibrary.createAssetLibrariesPage({
		name: spaceNameWithRecycleBin,
		settings: {
			logoColor: 'outline-3',
			sharingEnabled: true,
			trashEnabled: true,
		},
		type: 'Space',
	});

	await apiHelpers.headlessAssetLibrary.createAssetLibrariesPage({
		name: spaceNameWithoutRecycleBin,
		settings: {
			logoColor: 'outline-3',
			sharingEnabled: true,
			trashEnabled: false,
		},
		type: 'Space',
	});

	await apiHelpers.objectEntry.postObjectEntry(
		{
			objectEntryFolderExternalReferenceCode: 'L_CONTENTS',
			title: file1Title,
		},
		applicationName,
		spaceNameWithRecycleBin
	);

	await apiHelpers.objectEntry.postObjectEntry(
		{
			objectEntryFolderExternalReferenceCode: 'L_CONTENTS',
			title: file2Title,
		},
		applicationName,
		spaceNameWithoutRecycleBin
	);

	await assetsPage.gotoAll();

	await assetsPage.selectItems([file1Title, file2Title]);

	await page
		.getByTestId('visualization-mode-table')
		.getByLabel('Actions')
		.click();

	await page.getByRole('menuitem', {name: 'Delete'}).click();

	expect(page.getByText('Some of the selected files')).toBeVisible();

	await page.getByRole('button', {name: 'Delete'}).click();

	await page.reload();

	await expect(page.getByRole('cell', {name: file1Title})).not.toBeVisible();
	await expect(page.getByRole('cell', {name: file2Title})).not.toBeVisible();

	await recycleBinPage.goto();

	await expect(page.getByRole('cell', {name: file1Title})).toBeVisible();
});

test('Can delete multiple contents in a space with recycle bin disabled', async ({
	apiHelpers,
	assetsPage,
	page,
}) => {
	const applicationName = 'cms/basic-web-contents';
	const spaceName = `Space ${getRandomString()}`;
	const file1Title = `title ${getRandomString()}`;
	const file2Title = `title ${getRandomString()}`;

	await apiHelpers.headlessAssetLibrary.createAssetLibrariesPage({
		name: spaceName,
		settings: {
			logoColor: 'outline-3',
			sharingEnabled: true,
			trashEnabled: false,
		},
		type: 'Space',
	});

	await apiHelpers.objectEntry.postObjectEntry(
		{
			objectEntryFolderExternalReferenceCode: 'L_CONTENTS',
			title: file1Title,
		},
		applicationName,
		spaceName
	);

	await apiHelpers.objectEntry.postObjectEntry(
		{
			objectEntryFolderExternalReferenceCode: 'L_CONTENTS',
			title: file2Title,
		},
		applicationName,
		spaceName
	);

	await assetsPage.gotoAll();

	await assetsPage.selectItems([file1Title, file2Title]);

	await page
		.getByTestId('visualization-mode-table')
		.getByLabel('Actions')
		.click();

	await page.getByRole('menuitem', {name: 'Delete'}).click();

	await expect(page.getByText('You are about to permanently')).toBeVisible();

	await page.getByRole('button', {name: 'Delete'}).click();

	await page.reload();

	await expect(page.getByRole('cell', {name: file1Title})).not.toBeVisible();
	await expect(page.getByRole('cell', {name: file2Title})).not.toBeVisible();
});

test('Can delete multiple contents in a space with recycle bin enabled', async ({
	apiHelpers,
	assetsPage,
	page,
	recycleBinPage,
}) => {
	const applicationName = 'cms/basic-web-contents';
	const spaceName = `Space ${getRandomString()}`;
	const file1Title = `title ${getRandomString()}`;
	const file2Title = `title ${getRandomString()}`;

	await apiHelpers.headlessAssetLibrary.createAssetLibrariesPage({
		name: spaceName,
		settings: {
			logoColor: 'outline-3',
			sharingEnabled: true,
			trashEnabled: true,
		},
		type: 'Space',
	});

	await apiHelpers.objectEntry.postObjectEntry(
		{
			objectEntryFolderExternalReferenceCode: 'L_CONTENTS',
			title: file1Title,
		},
		applicationName,
		spaceName
	);

	await apiHelpers.objectEntry.postObjectEntry(
		{
			objectEntryFolderExternalReferenceCode: 'L_CONTENTS',
			title: file2Title,
		},
		applicationName,
		spaceName
	);

	await assetsPage.gotoAll();

	await assetsPage.selectItems([file1Title, file2Title]);

	await page
		.getByTestId('visualization-mode-table')
		.getByLabel('Actions')
		.click();

	await page.getByRole('menuitem', {name: 'Delete'}).click();

	await page.reload();

	await recycleBinPage.goto();

	await expect(page.getByRole('cell', {name: file1Title})).toBeVisible();
	await expect(page.getByRole('cell', {name: file2Title})).toBeVisible();
});

test(
	'Can view Share modal for added content',
	{tag: '@LPD-62554'},
	async ({apiHelpers, assetsPage}) => {
		const applicationName = 'cms/knowledge-bases';
		const file1Title = `Title ${getRandomString()}`;
		const spaceName = `Space ${getRandomString()}`;
		let objectEntry1;

		await apiHelpers.headlessAssetLibrary.createAssetLibrariesPage({
			name: spaceName,
			settings: {
				logoColor: 'outline-3',
				sharingEnabled: true,
			},
			type: 'Space',
		});

		try {
			objectEntry1 = await apiHelpers.objectEntry.postObjectEntry(
				{
					objectEntryFolderExternalReferenceCode: 'L_CONTENTS',
					title: file1Title,
				},
				applicationName,
				spaceName
			);

			await assetsPage.gotoAll();

			await assetsPage.execItemAction({
				action: 'Share',
				filter: file1Title,
			});

			await expect(assetsPage.modal.title).toContainText(file1Title);
		}
		finally {
			await apiHelpers.objectEntry.deleteObjectEntry(
				applicationName,
				String(objectEntry1.id)
			);
		}
	}
);

test(
	'Can view Delete confirmation modal for added content',
	{tag: '@LPD-62554'},
	async ({apiHelpers, assetsPage, page}) => {
		const applicationName = 'cms/knowledge-bases';
		const spaceName = 'Default';
		let objectEntry1;

		const file1Title = `title ${getRandomString()}`;

		try {
			objectEntry1 = await apiHelpers.objectEntry.postObjectEntry(
				{
					objectEntryFolderExternalReferenceCode: 'L_CONTENTS',
					title: file1Title,
				},
				applicationName,
				spaceName
			);

			await assetsPage.gotoAll();

			await assetsPage.table.bodyRows
				.filter({hasText: file1Title})
				.locator('input[title="Select Item"]')
				.check();

			await assetsPage.execBulkItemAction('Delete');

			await expect(page.locator('.modal-title')).toContainText(
				'Delete Entry'
			);
		}
		finally {
			await apiHelpers.objectEntry.deleteObjectEntry(
				applicationName,
				String(objectEntry1.id)
			);
		}
	}
);

test('Dragging and dropping files into the data set opens upload modal', async ({
	assetsPage,
	page,
}) => {
	await assetsPage.gotoAll();

	const dataSetWrapper = page.locator('div.data-set-wrapper').first();
	const dataTransfer = await page.evaluateHandle(
		(data) => {
			const dt = new DataTransfer();

			const file = new File(
				[data.toString('hex')],
				'file_upload_image_1.jpeg',
				{
					type: 'image/jpg',
				}
			);
			dt.items.add(file);

			return dt;
		},
		readFileSync(
			path.join(__dirname, '/dependencies/file_upload_image_1.jpg')
		)
	);

	await dataSetWrapper.dispatchEvent('dragstart', {dataTransfer});
	await dataSetWrapper.dispatchEvent('dragenter', {dataTransfer});
	await dataSetWrapper.dispatchEvent('dragover', {dataTransfer});

	await dataSetWrapper.dispatchEvent('drop', {dataTransfer});
	await dataSetWrapper.dispatchEvent('dragend', {dataTransfer});

	await expect(assetsPage.modal.container).toBeVisible();

	await expect(assetsPage.modal.title).toContainText('Upload Multiple Files');
	await expect(assetsPage.modal.body).toContainText(
		'file_upload_image_1.jpeg'
	);
});
