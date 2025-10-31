/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React from "react";

import AIDropdownItem from "./components/AIDropdownItem";

import './ai-dropdown-actions.scss';

import '../../../css/ckeditor5/editor.scss'

const AiDropdown: React.FC<{ selectedText: string, setNewContent: (newText: string) => void }> = ({ selectedText, setNewContent }) => {

    const suggestedDropdownItems = [
        { label: "Improve writing" },
        { label: "AI Action 2" },
        { label: "AI Action 3" },
    ];

    return (
        <div className="ai-dropdown">
            <div className="suggested-group">
                <span>SUGGESTED</span>

                {suggestedDropdownItems.map((item, index) => (
                    <AIDropdownItem item={item} key={index} setNewContent={setNewContent} />
                ))}
            </div>
        </div>
    );
}

export default AiDropdown;