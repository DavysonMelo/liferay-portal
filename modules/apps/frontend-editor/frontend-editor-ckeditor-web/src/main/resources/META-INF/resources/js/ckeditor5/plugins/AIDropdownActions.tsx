/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {Command, Plugin} from '@ckeditor/ckeditor5-core/dist/index.js';
import {
	ContextualBalloon, View
} from '@ckeditor/ckeditor5-ui/dist/index.js';
import React from 'react';
import {Root, createRoot} from 'react-dom/client';

import AiDropdown from '../AiDropdown/AiDropdown';

export default class AIDropdownActions extends Plugin {
    private _balloonView: View | null = null;
	private _reactRoot: Root | null = null;

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
		if (this._balloonView && balloon.hasView(this._balloonView)) {
			return;
		}

		const reactView = new View();

		reactView.setTemplate({
			attributes: {
				class: 'custom-react-balloon',
			},
			tag: 'div',
		});

		reactView.once('render', () => {
			if (!reactView.element) {return;}

			const root = createRoot(reactView.element);
			root.render(<AiDropdown selectedText={selectedText} />);
			this._reactRoot = root;
		});

		this._balloonView = reactView;

		balloon.add({
			position: this._getBalloonPosition(editor),
			view: this._balloonView,
		});
	}

	_hideBalloon(balloon: ContextualBalloon) {
		if (this._balloonView && balloon.hasView(this._balloonView)) {
			balloon.remove(this._balloonView);
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
