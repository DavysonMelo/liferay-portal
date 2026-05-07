/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

declare module '@liferay/ai-hub-cell-js-components-web' {
	import {FC} from 'react';

	export interface ChatContext {
		context: Record<string, unknown>;
		instructionDefinitionScope: string;
	}

	export interface AIAssistantChatProps {
		autoSendInitialMessage?: boolean;
		compact?: boolean;
		embedded?: boolean;
		externalEventTypes?: string[];
		generatingLabel?: string;
		getContext: () => ChatContext;
		initialAssistantReply?: string;
		initialMessage?: string;
		onExternalEvent?: (type: string, data: string) => void;
		onSubscribe?: (eventSourceReference: string) => void;
	}

	export const AIAssistantChat: FC<AIAssistantChatProps>;
}
