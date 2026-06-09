/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {cleanup, render, screen, waitFor} from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';

import HomeDashboard from '../../../src/main/resources/META-INF/resources/js/home_dashboard/HomeDashboard';

const mockGetAgentDefinitions = jest.fn();
const mockGetChatbots = jest.fn();

jest.mock(
	'../../../src/main/resources/META-INF/resources/js/agent_definition_form/services/AgentDefinitionService',
	() => ({
		getAgentDefinitions: (...args: any[]) =>
			mockGetAgentDefinitions(...args),
	})
);

jest.mock(
	'../../../src/main/resources/META-INF/resources/js/chatbot_form/services/ChatbotService',
	() => ({
		getChatbots: (...args: any[]) => mockGetChatbots(...args),
	})
);

(global as any).Liferay = {
	Icons: {spritemap: 'icons.svg'},
	Language: {
		get: (key: string) => key,
	},
};

const defaultProps = {
	agentBuilderURL: '/agent-builder',
	agentURL: '/agent',
	backURL: '/back',
	chatbotURL: '/chatbot',
	chatbotsURL: '/chatbots',
};

function buildItems(prefix: string, count: number) {
	return Array.from({length: count}, (_, index) => ({
		active: true,
		externalReferenceCode: `${prefix}_${index}`,
		title: `${prefix} ${index}`,
	}));
}

describe('HomeDashboard', () => {
	beforeEach(() => {
		mockGetAgentDefinitions.mockReset();
		mockGetChatbots.mockReset();
	});

	afterEach(() => {
		cleanup();
	});

	it('requests the latest agents and chatbots sorted by modification date', async () => {
		mockGetAgentDefinitions.mockResolvedValue({items: []});
		mockGetChatbots.mockResolvedValue({items: []});

		render(<HomeDashboard {...defaultProps} />);

		await waitFor(() => {
			expect(mockGetAgentDefinitions).toHaveBeenCalledWith({
				pageSize: '4',
				sort: 'dateModified:desc',
			});
		});

		expect(mockGetChatbots).toHaveBeenCalledWith({
			pageSize: '4',
			sort: 'dateModified:desc',
		});
	});

	it('renders up to four chatbots in the order returned by the server', async () => {
		mockGetAgentDefinitions.mockResolvedValue({items: []});
		mockGetChatbots.mockResolvedValue({items: buildItems('Chatbot', 5)});

		render(<HomeDashboard {...defaultProps} />);

		await waitFor(() => {
			expect(screen.getByText('Chatbot 0')).toBeInTheDocument();
		});

		expect(screen.getByText('Chatbot 1')).toBeInTheDocument();
		expect(screen.getByText('Chatbot 2')).toBeInTheDocument();
		expect(screen.getByText('Chatbot 3')).toBeInTheDocument();
		expect(screen.queryByText('Chatbot 4')).not.toBeInTheDocument();
	});

	it('renders up to four agents', async () => {
		mockGetAgentDefinitions.mockResolvedValue({
			items: buildItems('Agent', 5),
		});
		mockGetChatbots.mockResolvedValue({items: []});

		render(<HomeDashboard {...defaultProps} />);

		await waitFor(() => {
			expect(screen.getByText('Agent 0')).toBeInTheDocument();
		});

		expect(screen.getByText('Agent 3')).toBeInTheDocument();
		expect(screen.queryByText('Agent 4')).not.toBeInTheDocument();
	});
});
