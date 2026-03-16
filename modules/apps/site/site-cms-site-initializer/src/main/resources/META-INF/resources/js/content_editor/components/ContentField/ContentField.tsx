/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import { CKEditor5ClassicEditor } from "frontend-editor-ckeditor-web";
import React from "react";

import WritingAssistant from "./WritingAssistantPlugin/WritingAssistant";


function ContentField({ckEditor5Config}: {ckEditor5Config: any}) {
    const [data, setData] = React.useState("");

    const configWithWritingAssistant = React.useMemo(() => {
        const extraPlugins = ckEditor5Config.extraPlugins || [];
        if (!extraPlugins.includes(WritingAssistant)) {
            extraPlugins.push(WritingAssistant);
        }

        return {
            ...ckEditor5Config,
            extraPlugins,
        };
    }, [ckEditor5Config]);

    return (
        <CKEditor5ClassicEditor
            config={configWithWritingAssistant}
            data={data}
            formInputEnabled={true}
            formInputName="content"
            onBlur={() => {
                console.log("blur");
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                setData(data);
            }}
            onFocus={() => {
                console.log("focus");
            }}
        />
    );
}

export default ContentField;