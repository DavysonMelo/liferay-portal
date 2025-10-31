/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
 
import ClayIcon, { ClayIconSpriteContext } from '@clayui/icon'

import React from "react";


const AIDropdownItem = ({ item: { label }, setNewContent }: { item: { label: string }, setNewContent: (newText: string) => void },) => {

	function handleClick() {
		setNewContent("text changed");
	}

	return (
		<div className="ai-dropdown-item" onClick={handleClick}>
			<ClayIcon height={10} spritemap={Liferay.Icons.spritemap} symbol='magic' width={10} />

			<span className="ai-dropdown-item-label">{label}</span>
		</div>
	);
};

export default AIDropdownItem;
