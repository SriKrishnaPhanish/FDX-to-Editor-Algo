import { Editor } from "@tiptap/react";
import myExports from './fdx.js'

const {convertFdxToJson, html} = myExports

export const mainConvertFdxToJson = async (node: string, editor: Editor) => {
    convertFdxToJson(node);
    const newhtml = html.join("");
    editor.commands.setContent(newhtml);
    return JSON.stringify(newhtml);
};
  