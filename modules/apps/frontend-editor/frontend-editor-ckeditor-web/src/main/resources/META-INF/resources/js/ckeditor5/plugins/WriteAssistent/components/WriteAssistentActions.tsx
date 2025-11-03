/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayDropDown from '@clayui/drop-down';
import React, {useEffect, useRef} from 'react';

interface ActionItem {
	disabled?: boolean;
	name: string;
	symbolLeft?: string;
	symbolRight?: string;
	type: string;
}

export default function WriteAssistentActions({
	containerRef,
}: {
	containerRef: HTMLElement;
}) {
	const alignRef = useRef<HTMLElement | null>(null);
	const menuElementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		alignRef.current = containerRef ?? null;
	}, [containerRef]);

	const actionsGroup = [
		{
			children: [
				{
					disabled: false,
					name: Liferay.Language.get('improve-writing'),
					symbolLeft: 'magic',
					type: 'improveWriting',
				},
				{
					disabled: true,
					name: Liferay.Language.get('fix-spelling-grammar'),
					symbolLeft: 'check',
					type: 'fixSpellingGrammar',
				},
				{
					disabled: true,
					name: Liferay.Language.get('translate-to'),
					symbolLeft: 'automatic-translate',
					symbolRight: 'angle-right-small',
					type: 'translateTo',
				},
			],
			name: Liferay.Language.get('suggested'),
		},
		{type: 'divider'},
		{
			children: [
				{
					disabled: true,
					name: Liferay.Language.get('make-shorter'),
					symbolLeft: 'bars',
					type: 'makeShorter',
				},
				{
					disabled: true,
					name: Liferay.Language.get('make-longer'),
					symbolLeft: 'align-justify',
					type: 'makeShorter',
				},
				{
					disabled: true,
					name: Liferay.Language.get('change-tone'),
					symbolRight: 'angle-right-small',
					type: 'makeLonger',
				},
			],
			name: Liferay.Language.get('edit'),
		},
		{type: 'divider'},
		{
			children: [
				{disabled: true, name: 'Title', type: 'generateBasedOnTitle'},
			],
			name: Liferay.Language.get('generate-based-on'),
		},
	];

	return (
		<ClayDropDown.Menu
			active={true}
			alignElementRef={alignRef}
			onActiveChange={() => {}}
			ref={menuElementRef}
		>
			<ClayDropDown.ItemList items={actionsGroup}>
				{(group: any) => (
					<ClayDropDown.Group<ActionItem>
						header={group.name}
						items={group.children}
						key={group.name}
					>
						{(child: ActionItem) => (
							<ClayDropDown.Item
								disabled={child.disabled}
								key={child.name}
								onClick={() => {}}
								spritemap={
									Liferay.ThemeDisplay.getPathThemeImages() +
									'/clay/icons.svg'
								}
								symbolLeft={child.symbolLeft}
								symbolRight={child.symbolRight}
							>
								<span className="ml-4">{child.name}</span>
							</ClayDropDown.Item>
						)}
					</ClayDropDown.Group>
				)}
			</ClayDropDown.ItemList>
		</ClayDropDown.Menu>
	);
}
