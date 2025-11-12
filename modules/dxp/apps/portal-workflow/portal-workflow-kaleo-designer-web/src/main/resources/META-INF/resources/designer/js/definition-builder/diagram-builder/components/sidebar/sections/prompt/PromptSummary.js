/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {ClayInput} from '@clayui/form';
import PropTypes from 'prop-types';
import React, {useContext, useMemo} from 'react';

import {DiagramBuilderContext} from '../../../../DiagramBuilderContext';
import {
	formatVariablesForTextarea,
	parseVariablesInput,
} from '../../../../util/parseVariables';
import SidebarPanel from '../../SidebarPanel';

const PromptSummary = () => {
	const {selectedItem, setSelectedItem} = useContext(DiagramBuilderContext);

	const inputVariablesValue = useMemo(
		() => formatVariablesForTextarea(selectedItem?.data?.inputVariables),
		[selectedItem]
	);

	const outputVariablesValue = useMemo(
		() => formatVariablesForTextarea(selectedItem?.data?.outputVariables),
		[selectedItem]
	);

	const handleVariablesChange =
		(field) =>
		({target}) => {
			if (!selectedItem) {
				return;
			}

			const text = target.value;
			const parsed = parseVariablesInput(text);

			const updatedItem = {
				...selectedItem,
				data: {
					...selectedItem.data,
					[field]: parsed,
				},
			};

			setSelectedItem(updatedItem);
		};

	return (
		<SidebarPanel panelTitle={Liferay.Language.get('prompt')}>
			<ClayInput
				component="textarea"
				onChange={({target}) =>
					setSelectedItem({
						...selectedItem,
						data: {
							...selectedItem.data,
							prompt: target.value,
						},
					})
				}
				type="text"
				value={selectedItem?.data.prompt ?? ''}
			/>

			<label
				className="mt-4"
				htmlFor="workflowDefinitionBaseNodeDescription"
			>
				{Liferay.Language.get('input-variables')}
			</label>

			<ClayInput
				className="mt-2"
				component="textarea"
				onChange={handleVariablesChange('inputVariables')}
				placeholder='[{"name":"tone", "type":"string"}]'
				type="text"
				value={inputVariablesValue}
			/>

			<label
				className="mt-4"
				htmlFor="workflowDefinitionBaseNodeDescription"
			>
				{Liferay.Language.get('output-variables')}
			</label>

			<ClayInput
				className="mt-2"
				component="textarea"
				onChange={handleVariablesChange('outputVariables')}
				placeholder='[{"name":"tone", "type":"string"}]'
				type="text"
				value={outputVariablesValue}
			/>
		</SidebarPanel>
	);
};

PromptSummary.propTypes = {
	setContentName: PropTypes.func.isRequired,
};

export default PromptSummary;
