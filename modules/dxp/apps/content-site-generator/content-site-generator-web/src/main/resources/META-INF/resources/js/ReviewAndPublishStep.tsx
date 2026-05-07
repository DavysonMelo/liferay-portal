/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from '@clayui/button';
import {ClayCheckbox, ClayInput} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import {ClayPaginationWithBasicItems} from '@clayui/pagination';
import ClayPaginationBar from '@clayui/pagination-bar';
import ClayTable from '@clayui/table';
import React, {useState} from 'react';

import {SPRITEMAP} from './constants/spritemap';
import {MOCK_ENTRIES, MOCK_STATS} from './mocks/reviewAndPublishStep';

export default function ReviewAndPublishStep() {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [search, setSearch] = useState('');
	const [selected, setSelected] = useState<Set<string>>(new Set());

	const filteredEntries = search
		? MOCK_ENTRIES.filter((entry) =>
				entry.title.toLowerCase().includes(search.toLowerCase())
			)
		: MOCK_ENTRIES;

	const pagedEntries = filteredEntries.slice(
		(page - 1) * pageSize,
		page * pageSize
	);

	const allSelected =
		!!filteredEntries.length && selected.size === filteredEntries.length;

	const handleSearch = (value: string) => {
		setSearch(value);
		setPage(1);
	};

	const toggleSelectAll = () => {
		if (allSelected) {
			setSelected(new Set());
		}
		else {
			setSelected(new Set(filteredEntries.map((entry) => entry.title)));
		}
	};

	const toggleSelected = (title: string) => {
		const next = new Set(selected);

		if (next.has(title)) {
			next.delete(title);
		}
		else {
			next.add(title);
		}

		setSelected(next);
	};

	return (
		<div className="content-site-generator__review">
			<div className="content-site-generator__review-header">
				<h3 className="content-site-generator__section-title">
					{Liferay.Language.get('review-and-publish')}
				</h3>

				<p className="text-secondary">
					{Liferay.Language.get(
						'review-generated-pages-before-publishing-to-cms'
					)}
				</p>
			</div>

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

			<div className="content-site-generator__toolbar">
				<ClayCheckbox
					aria-label={Liferay.Language.get('select-all')}
					checked={allSelected}
					onChange={toggleSelectAll}
				/>

				<ClayButton displayType="unstyled">
					<ClayIcon
						className="mr-2"
						spritemap={SPRITEMAP}
						symbol="filter"
					/>

					{Liferay.Language.get('filter')}

					<ClayIcon
						className="ml-1"
						spritemap={SPRITEMAP}
						symbol="caret-bottom"
					/>
				</ClayButton>

				<ClayButton displayType="unstyled">
					<ClayIcon
						className="mr-2"
						spritemap={SPRITEMAP}
						symbol="order-arrow"
					/>

					{Liferay.Language.get('order')}

					<ClayIcon
						className="ml-1"
						spritemap={SPRITEMAP}
						symbol="caret-bottom"
					/>
				</ClayButton>

				<ClayInput.Group className="content-site-generator__search">
					<ClayInput.GroupItem>
						<ClayInput
							aria-label={Liferay.Language.get('search')}
							onChange={(event) =>
								handleSearch(event.target.value)
							}
							placeholder={Liferay.Language.get('search')}
							type="text"
							value={search}
						/>

						<ClayInput.GroupInsetItem after tag="span">
							<ClayButton
								displayType="unstyled"
								title={Liferay.Language.get('search')}
							>
								<ClayIcon
									spritemap={SPRITEMAP}
									symbol="search"
								/>
							</ClayButton>
						</ClayInput.GroupInsetItem>
					</ClayInput.GroupItem>
				</ClayInput.Group>
			</div>

			<ClayTable className="content-site-generator__table">
				<ClayTable.Head>
					<ClayTable.Row>
						<ClayTable.Cell headingCell>
							<ClayCheckbox
								aria-label={Liferay.Language.get('select-all')}
								checked={allSelected}
								onChange={toggleSelectAll}
							/>
						</ClayTable.Cell>

						<ClayTable.Cell headingCell>
							{Liferay.Language.get('title')}
						</ClayTable.Cell>

						<ClayTable.Cell headingCell>
							{Liferay.Language.get('language')}
						</ClayTable.Cell>

						<ClayTable.Cell headingCell>
							{Liferay.Language.get('items')}
						</ClayTable.Cell>

						<ClayTable.Cell headingCell>
							{Liferay.Language.get('url')}
						</ClayTable.Cell>

						<ClayTable.Cell headingCell>
							<ClayButton
								aria-label={Liferay.Language.get(
									'column-options'
								)}
								className="component-action"
								displayType="unstyled"
							>
								<ClayIcon
									spritemap={SPRITEMAP}
									symbol="caret-bottom"
								/>
							</ClayButton>
						</ClayTable.Cell>
					</ClayTable.Row>
				</ClayTable.Head>

				<ClayTable.Body>
					{pagedEntries.map((entry) => (
						<ClayTable.Row key={entry.title}>
							<ClayTable.Cell>
								<ClayCheckbox
									aria-label={entry.title}
									checked={selected.has(entry.title)}
									onChange={() => toggleSelected(entry.title)}
								/>
							</ClayTable.Cell>

							<ClayTable.Cell>
								<ClayIcon
									className="mr-2 text-secondary"
									spritemap={SPRITEMAP}
									symbol={entry.icon}
								/>

								<a href={entry.url}>{entry.title}</a>
							</ClayTable.Cell>

							<ClayTable.Cell>{entry.language}</ClayTable.Cell>

							<ClayTable.Cell>{entry.items}</ClayTable.Cell>

							<ClayTable.Cell>
								<span className="content-site-generator__url">
									{entry.url}
								</span>
							</ClayTable.Cell>

							<ClayTable.Cell>
								<ClayButton
									aria-label={Liferay.Language.get('actions')}
									className="component-action"
									displayType="unstyled"
								>
									<ClayIcon
										spritemap={SPRITEMAP}
										symbol="ellipsis-v"
									/>
								</ClayButton>
							</ClayTable.Cell>
						</ClayTable.Row>
					))}
				</ClayTable.Body>
			</ClayTable>

			<ClayPaginationBar>
				<ClayPaginationBar.DropDown
					items={[10, 20, 30, 50].map((size) => ({
						label: String(size),
						onClick: () => {
							setPageSize(size);
							setPage(1);
						},
					}))}
					trigger={
						<ClayButton displayType="unstyled">
							{Liferay.Util.sub(
								Liferay.Language.get('x-items'),
								String(pageSize)
							)}

							<ClayIcon
								className="ml-1"
								spritemap={SPRITEMAP}
								symbol="caret-bottom"
							/>
						</ClayButton>
					}
				/>

				<ClayPaginationBar.Results>
					{Liferay.Util.sub(
						Liferay.Language.get('showing-x-to-x-of-x-entries'),
						String((page - 1) * pageSize + 1),
						String(
							Math.min(page * pageSize, filteredEntries.length)
						),
						String(filteredEntries.length)
					)}
				</ClayPaginationBar.Results>

				<ClayPaginationWithBasicItems
					activePage={page}
					ellipsisBuffer={1}
					ellipsisProps={{
						'aria-label': Liferay.Language.get('more'),
						'title': Liferay.Language.get('more'),
					}}
					onPageChange={setPage}
					totalPages={Math.ceil(filteredEntries.length / pageSize)}
				/>
			</ClayPaginationBar>
		</div>
	);
}
