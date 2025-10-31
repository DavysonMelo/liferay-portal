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
	private _textSelection = '';

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
			this._selectText(model);
			

			if (this._textSelection.trim().length) {
				this._showBalloon(this._textSelection, balloon, editor);
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
			root.render(<AiDropdown selectedText={selectedText} setNewContent={this._changeText.bind(this)} />);
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

	_selectText(model: any) {
		const selection = model.document.selection;
			this._textSelection = '';

			for (const range of selection.getRanges()) {
				for (const item of range.getItems()) {
					if (item.is && item.is('model:$textProxy')) {
						this._textSelection += (item as any).data;
					}
				}
			}
	}

	_changeText(newText: string,) {
		const editor = this.editor;
		const model = editor.model;
		const view = editor.editing.view;
		
		model.change((writer: any) => {
			const selection = model.document.selection;
			const range = selection.getFirstRange();

			if (!range) {
				return;
			}

			writer.remove(range);

			const insertPosition = range.start;
			writer.insertText(newText, insertPosition);

			const endPosition = writer.createPositionAt(
				insertPosition.parent,
				insertPosition.offset + newText.length
			);
			const newRange = writer.createRange(insertPosition, endPosition);

			writer.setSelection(newRange);
		});

		view.scrollToTheSelection();

		editor.editing.view.change((viewWriter: any) => {
			viewWriter.focus();
		});

		// const editorContent = this.editor.getData();

		// this.editor.setData(editorContent.replaceAll(this._textSelection, newText));
	}
}
