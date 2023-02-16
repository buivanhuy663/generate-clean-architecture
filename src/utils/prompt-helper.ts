import _ = require("lodash");
import { InputBoxOptions, OpenDialogOptions, window } from "vscode";


export async function promptFileName(): Promise<string> {
    const fileName = await _showPrompt("Enter File Name", "");
    if (_.isNil(fileName) || fileName.trim() === "") {
        throw new Error("The file name must not be empty");
    } else {
        return fileName;
    }
}

export async function promptJsonData(): Promise<Thenable<Map<String, unknown>>> {
    const jsonDataPromptOptions: InputBoxOptions = {
        prompt: "Enter Json String",
    };
    const stringData = await window.showInputBox(jsonDataPromptOptions);
    if (_.isNil(stringData) || stringData.trim() === "") {
        return new Map();
    }
    const jsonObject = JSON.parse(stringData);
    const personsMap = new Map(Object.entries(jsonObject));
    return personsMap;
}

export async function promptForTargetDirectory(): Promise<string | undefined> {
    const options: OpenDialogOptions = {
        canSelectMany: false,
        openLabel: "Select a folder to create the bloc in",
        canSelectFolders: true,
    };

    return window.showOpenDialog(options).then((uri) => {
        if (_.isNil(uri) || _.isEmpty(uri)) {
            return undefined;
        }
        return uri![0].fsPath;
    });
}


function _showPrompt(name: string, hint: string): Thenable<string | undefined> {
    const namePromptOptions: InputBoxOptions = {
        prompt: name,
        placeHolder: hint,
    };
    return window.showInputBox(namePromptOptions);
}