/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {Command, Plugin} from '@ckeditor/ckeditor5-core/dist/index.js';

// import {ButtonView, Command, ContextualBalloon, Plugin} from '@ckeditor/ckeditor5';

import {
	ButtonView,
	ContextualBalloon,
} from '@ckeditor/ckeditor5-ui/dist/index.js';

import { createRoot } from 'react-dom/client';
import { createElement } from 'react';

import AiDropdown from '../AiDropdown/AiDropdown';

export default class AIDropdownActions extends Plugin {
	private _buttonView?: ButtonView;

	static get requires() {
		return [ContextualBalloon];
	}
	init() {
		const editor = this.editor;
		const commandName = 'aidropdownActions';

		editor.commands.add(commandName, new Command(editor));

		const model = editor.model;
		const view = editor.editing.view;
		const balloon = editor.plugins.get(ContextualBalloon);

		view.document.on('mouseup', () => {
			const selection = model.document.selection;
			let text = '';

			for (const range of selection.getRanges()) {
				for (const item of range.getItems()) {
					if (item.is && item.is('model:$textProxy')) {
						text += (item as any).data;
					}
				}
			}

			if (text.trim().length) {
				this._showBalloon(text, balloon, editor);
			}
			else {
				this._hideBalloon(balloon);
			}
		});
	}

	_showBalloon(
		selectedText: string,
		balloon: ContextualBalloon,
		editor: any
	) {
		if (this._buttonView && balloon.hasView(this._buttonView)) {
			return;
		}
        const container = document.createElement('div');
        container.classList.add('custom-react-balloon');
        
		const root = createRoot(container);
		root.render(createElement(AiDropdown, {selectedText}));

		balloon.add({
			position: this._getBalloonPosition(editor),
			view: container,
		});
	}

	_hideBalloon(balloon: ContextualBalloon) {
		if (this._buttonView && balloon.hasView(this._buttonView)) {
			balloon.remove(this._buttonView);
		}
	}

	_getBalloonPosition(editor: any) {
		const view = editor.editing.view;
		const domConverter = view.domConverter;
		const domRange = domConverter.viewRangeToDom(
			view.document.selection.getFirstRange()
		);

		return {target: domRange};
	}
}
