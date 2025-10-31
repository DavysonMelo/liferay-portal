/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
 
import ClayIcon from '@clayui/icon';
import ClayLoaddingIndicator from '@clayui/loading-indicator';
import React, { useState } from "react";

interface action {
	icon: string;
	label: string;
	setNewContent: (newText: string) => void;
}

const AIDropdownItem = ({icon, label, setNewContent}: action) => {
	
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [actionDisabled, setActionDisabled] = useState<boolean>(false); 

	function handleClick() {
		setIsLoading(true);
		setActionDisabled(true);
		setTimeout(() => {
			setNewContent("text changed");
			setIsLoading(false);
			setActionDisabled(false);
		}, 2000)
	}

	return (
		<div className="ai-dropdown-item" onClick={handleClick}>
			<div>
				<ClayIcon height={16} opacity={actionDisabled ? 0.4 : 1} spritemap={Liferay.Icons.spritemap} symbol={icon} width={16} />

				<span className={`ai-dropdown-item-label ${actionDisabled && 'ai-dropdown-item-label-disabled'}`}>{label}</span>
			</div>

			{isLoading && <ClayLoaddingIndicator className='ai-dropdown-item-loading-indicator' />}
		</div>
	);
};

export default AIDropdownItem;
