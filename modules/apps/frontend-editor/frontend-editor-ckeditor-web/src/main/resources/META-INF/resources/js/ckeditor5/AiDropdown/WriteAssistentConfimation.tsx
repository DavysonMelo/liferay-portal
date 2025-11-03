/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayIcon from '@clayui/icon';
import React from "react";

const WriteAssistentConfirmation: React.FC<{acceptFunction: () => void, discardFunction: () => void}> = ({acceptFunction, discardFunction}) => {

    function handleAccept () {
        acceptFunction();
    }

    function handleDiscard () {
        discardFunction();
    }

    return (
        <div>
            <div className="ai-dropdown">
            <div className="suggested-group">
                <div className="ai-dropdown-item" onClick={handleAccept}>
                    <div>
                        <ClayIcon height={16} spritemap={Liferay.Icons.spritemap} symbol='check' width={16} />

                        <span className="ai-dropdown-item-label">Accept</span>
                    </div>
                </div>

                <div className="ai-dropdown-item" onClick={handleDiscard}>
                    <div>
                        <ClayIcon height={16} spritemap={Liferay.Icons.spritemap} symbol='times' width={16} />

                        <span className="ai-dropdown-item-label">Discard</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default WriteAssistentConfirmation;