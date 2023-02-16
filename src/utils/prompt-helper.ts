import _ = require("lodash");
import { InputBoxOptions, window } from "vscode";


async function promptFileName(): Promise<string | undefined> {
    const fileName = await _showPrompt("File Name", "");
    if (_.isNil(fileName) || fileName.trim() === "") {
        window.showErrorMessage("The file name must not be empty");
        return;
    } else {
        return fileName;
    }
}


function _showPrompt(name: string, hint: string): Thenable<string | undefined> {
    const namePromptOptions: InputBoxOptions = {
        prompt: name,
        placeHolder: hint,
    };
    return window.showInputBox(namePromptOptions);
}