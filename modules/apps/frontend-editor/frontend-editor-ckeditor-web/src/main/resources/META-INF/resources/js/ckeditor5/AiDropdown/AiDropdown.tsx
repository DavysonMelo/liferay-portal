/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React from "react";

const AiDropdown: React.FC<{ selectedText: string }> = ({ selectedText }) => {

    function handleAIAction() {
        // Implement AI action logic here, e.g., call an AI service with selectedText

        alert(`AI Action triggered for text: ${selectedText}`);
    }

    return (
        <div>
            <ul>
                <li>
                    <button onClick={handleAIAction}>AI Action</button>
                </li>           
            </ul>
        </div>
    );
}

export default AiDropdown;