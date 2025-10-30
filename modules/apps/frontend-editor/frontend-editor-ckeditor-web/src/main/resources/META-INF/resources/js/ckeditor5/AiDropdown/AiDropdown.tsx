/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React from "react";

import AIDropdownItem from "./components/AIDropdownItem";

import './aiDropdown.scss';

const AiDropdown: React.FC<{ selectedText: string }> = ({ selectedText }) => {

    function handleAIAction() {
        // Implement AI action logic here, e.g., call an AI service with selectedText

        alert(`AI Action triggered for text: ${selectedText}`);
    }

    const suggestedDropdownItems = [
        { label: "AI Action 1" },
        { label: "AI Action 2" },
        { label: "AI Action 3" },
    ];

    return (
        <div className="ai-dropdown">
            <div className="suggested-group">
                <span>SUGGESTED</span>

                {suggestedDropdownItems.map((item, index) => (
                    <AIDropdownItem item={item} key={index} />
                ))}
            </div>
        </div>
    );
}

export default AiDropdown;