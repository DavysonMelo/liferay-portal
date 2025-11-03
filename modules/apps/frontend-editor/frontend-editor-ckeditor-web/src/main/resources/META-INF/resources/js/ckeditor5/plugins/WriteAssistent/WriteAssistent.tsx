/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {Command, Editor, Plugin} from '@ckeditor/ckeditor5-core/dist/index.js';
import {EditingView, Model} from '@ckeditor/ckeditor5-engine/dist/index.js';
import {ContextualBalloon, View} from '@ckeditor/ckeditor5-ui/dist/index.js';
import React from 'react';
import {Root, createRoot} from 'react-dom/client';

import WriteAssistentActions from './components/WriteAssistentActions';

export default class WriteAssistent extends Plugin {
	private _balloonView: View | null = null;
	private _reactRoot: Root | null = null;
	private _textSelection = '';

	static get requires() {
		return [ContextualBalloon];
	}
	init() {
		const editor = this.editor;

		const balloon = editor.plugins.get(ContextualBalloon);
		const commandName = 'writeAssistent';

		editor.commands.add(commandName, new Command(editor));
		const model = editor.model;
		const view = editor.editing.view;

		this._selectionChange(balloon, editor, model, view);
	}

	_changeContent(content: string) {
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

			writer.insertText(content, insertPosition);

			const endPosition = writer.createPositionAt(
				insertPosition.parent,
				insertPosition.offset + content.length
			);

			const newRange = writer.createRange(insertPosition, endPosition);

			writer.setSelection(newRange);
		});

		view.focus();
		view.scrollToTheSelection();
	}

	_getBalloonPosition(editor: any) {
		const view = editor.editing.view;

		const domConverter = view.domConverter;

		const domRange = domConverter.viewRangeToDom(
			view.document.selection.getFirstRange()
		);

		return {target: domRange};
	}

	_hideBalloon(balloon: ContextualBalloon) {
		if (this._balloonView && balloon.hasView(this._balloonView)) {
			balloon.remove(this._balloonView);
		}
	}

	_selectedContent(model: any) {
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

	_selectionChange(
		balloon: ContextualBalloon,
		editor: Editor,
		model: Model,
		view: EditingView
	) {
		view.document.on('mouseup', () => {
			this._selectedContent(model);

			if (this._textSelection.trim().length) {
				this._showBalloon(balloon, editor);
			}
			else {
				this._hideBalloon(balloon);
			}
		});
	}

	_showBalloon(balloon: ContextualBalloon, editor: any) {
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
			if (!reactView.element) {
				return;
			}

			const root = createRoot(reactView.element);

			root.render(
				<WriteAssistentActions containerRef={reactView.element} />
			);
			this._reactRoot = root;
		});

		this._balloonView = reactView;

		balloon.add({
			position: this._getBalloonPosition(editor),
			view: this._balloonView,
		});
	}
}
