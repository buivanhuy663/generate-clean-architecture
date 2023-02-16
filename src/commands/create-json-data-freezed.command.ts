import * as changeCase from "change-case";

import { existsSync, lstatSync, writeFile } from "fs";
import * as _ from "lodash";
import {
  InputBoxOptions,
  OpenDialogOptions,
  Uri,
  window,
  workspace
} from "vscode";
import {
  getJsonFrezzedClassTemplate,
  getJsonFrezzedParamClassTemplate
} from "../templates/json_class";
// import {
//   promptFileName,
// } from "../utils";

export const createNewJsonDataFreezedClass = async (uri: Uri) => {
  try {
    let targetDirectory;
    if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
      targetDirectory = await promptForTargetDirectory();
      if (_.isNil(targetDirectory)) {
        throw new Error("Please select a valid directory");
      }
    } else {
      targetDirectory = uri.fsPath;
    }


    const jsonClassName = await promptForJsonClassName();
    if (_.isNil(jsonClassName) || jsonClassName.trim() === "") {
      window.showErrorMessage("The file name must not be empty");
      return;
    }

    const jsonData = await promptForJsonData();

    const snakeCaseBlocName = changeCase.snakeCase(jsonClassName);
    const pascalCaseBlocName = changeCase.pascalCase(jsonClassName);

    await generateNewJsonClassCode(snakeCaseBlocName, targetDirectory, jsonData);
    window.showInformationMessage(
      `Successfully Generated ${pascalCaseBlocName}`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error Generator:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

function promptForJsonClassName(): Thenable<string | undefined> {
  const namePromptOptions: InputBoxOptions = {
    prompt: "Class Name",
    placeHolder: "ExampleModel",
  };
  return window.showInputBox(namePromptOptions);
}

async function promptForJsonData(): Promise<Thenable<Map<String, unknown>>> {
  const jsonDataPromptOptions: InputBoxOptions = {
    prompt: "Json Data",
  };
  const stringData = await window.showInputBox(jsonDataPromptOptions);
  if (_.isNil(stringData) || stringData.trim() === "") {
    return new Map();
  }
  const jsonObject = JSON.parse(stringData);
  const personsMap = new Map(Object.entries(jsonObject));
  return personsMap;
}

async function promptForTargetDirectory(): Promise<string | undefined> {
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

async function generateNewJsonClassCode(
  name: string,
  targetDirectory: string,
  data: Map<String, unknown>,
) {
  const shouldCreateDirectory = workspace
    .getConfiguration("bloc")
    .get<boolean>("newBlocTemplate.createDirectory");


  await Promise.all([
    createNewJsonClass(targetDirectory, name, data),
  ]);
  const snakeCaseBlocName = changeCase.snakeCase(name);
  workspace.openTextDocument(`${targetDirectory}/${snakeCaseBlocName}.dart`).then(doc => {
    window.showTextDocument(doc).then(editor => {
    });
  });
}

function createNewJsonClass(path: String,
  name: string,
  data: Map<String, unknown>,
) {
  const snakeCaseBlocName = changeCase.snakeCase(name);
  const targetPath = `${path}/${snakeCaseBlocName}.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseBlocName}.dart already exists`);
  }
  if (data.size === 0) {
    return new Promise<void>(async (resolve, reject) => {
      writeFile(targetPath, getJsonFrezzedClassTemplate(name), "utf8", (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  } else {
    return new Promise<void>(async (resolve, reject) => {
      writeFile(targetPath, getJsonFrezzedParamClassTemplate(name, data), "utf8", (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
}

