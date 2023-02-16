import * as changeCase from "change-case";

import { existsSync, lstatSync, writeFile } from "fs";
import * as _ from "lodash";
import {
  Uri,
  window,
  workspace
} from "vscode";
import {
  getJsonFrezzedClassTemplate,
  getJsonFrezzedParamClassTemplate,
  getJsonSerializationClassTemplate,
  getJsonSerializationParamClassTemplate
} from "../templates/json_class";
import { promptFileName, promptForTargetDirectory, promptJsonData } from "../utils";

enum TypeJsonDataE { freezed, serializable }

export const createJsonDataFreezedClass = async (uri: Uri) => {
  createNewJsonDataClass(TypeJsonDataE.freezed, uri);
};

export const createJsonDataSerializableClass = async (uri: Uri) => {
  createNewJsonDataClass(TypeJsonDataE.serializable, uri);
};

async function createNewJsonDataClass(type: TypeJsonDataE, uri: Uri) {
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

    const fileName = await promptFileName();
    
    const jsonData = await promptJsonData();

    const snakeCaseBlocName = changeCase.snakeCase(fileName);
    const pascalCaseBlocName = changeCase.pascalCase(fileName);

    await generateNewJsonClassCode(type, snakeCaseBlocName, targetDirectory, jsonData);
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


async function generateNewJsonClassCode(
  type: TypeJsonDataE,
  name: string,
  targetDirectory: string,
  data: Map<String, unknown>,
) {
  const shouldCreateDirectory = workspace
    .getConfiguration("bloc")
    .get<boolean>("newBlocTemplate.createDirectory");

  await Promise.all([
    createNewJsonClass(type, targetDirectory, name, data),
  ]);
  const snakeCaseBlocName = changeCase.snakeCase(name);
  workspace.openTextDocument(`${targetDirectory}/${snakeCaseBlocName}.dart`).then(doc => {
    window.showTextDocument(doc).then(editor => {
    });
  });
}

function createNewJsonClass(
  type: TypeJsonDataE,
  path: String,
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
      if (type === TypeJsonDataE.freezed) {
        writeFile(targetPath, getJsonFrezzedClassTemplate(name), "utf8", (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      } else if (type === TypeJsonDataE.serializable) {
        writeFile(targetPath, getJsonSerializationClassTemplate(name), "utf8", (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      } else {
        throw new Error("Type Invalid");
      }
    });
  } else {
    return new Promise<void>(async (resolve, reject) => {
      if (type === TypeJsonDataE.freezed) {
        writeFile(targetPath, getJsonFrezzedParamClassTemplate(name, data), "utf8", (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      } else if (type === TypeJsonDataE.serializable) {
        writeFile(targetPath, getJsonSerializationParamClassTemplate(name, data), "utf8", (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      } else {
        throw new Error("Type Invalid");
      }
    });
  }
}

