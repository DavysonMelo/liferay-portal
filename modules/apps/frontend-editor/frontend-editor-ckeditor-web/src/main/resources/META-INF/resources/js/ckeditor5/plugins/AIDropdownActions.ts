/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {ButtonView, ContextualBalloon, Plugin} from 'ckeditor5';

export default class AIDropdownActions extends Plugin {
	private _buttonView?: ButtonView;

	static get requires() {
		return [ContextualBalloon];
	}
	init() {
		const editor = this.editor;
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

		const buttonView = (this._buttonView = new ButtonView());
		buttonView.set({
			label: 'Do something',
			tooltip: true,
			withText: true,
		});

		buttonView.on('execute', () => {
			alert(`Selected text: ${selectedText}`);
			this._hideBalloon(balloon);
		});

		balloon.add({
			position: this._getBalloonPosition(editor),
			view: buttonView,
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
