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
  getExampleComponentTemplate,
  getNewPageModuleTemplate,
  getNewPagePresenterTemplate,
  getNewPageStateFreezedTemplate,
  getNewPageStateTemplate,
  getNewPageTemplate
} from "../templates/new_page";

const basePath = "lib/presentation/feature";

var parentPath: string;
var blocPath: string;
var componentsPath: string;
var pathRelative = "";




export const createNewPage = async (uri: Uri) => {
  const blocName = await promptForBlocName();
  if (_.isNil(blocName) || blocName.trim() === "") {
    window.showErrorMessage("The file name must not be empty");
    return;
  }

  let targetDirectory;
  if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await promptForTargetDirectory();
    if (_.isNil(targetDirectory)) {
      window.showErrorMessage("Please select a valid directory");
      return;
    }
  } else {
    targetDirectory = uri.fsPath;
  }
  const snakeCaseBlocName = changeCase.snakeCase(blocName);
  const pascalCaseBlocName = changeCase.pascalCase(blocName);
  try {
    if (!targetDirectory.includes(basePath)) {
      throw new Error(`A page needs to be created inside ${basePath}`);
    }

    await generateNewPageCode(snakeCaseBlocName, targetDirectory);
    window.showInformationMessage(
      `Successfully Generated ${pascalCaseBlocName}Page`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

function promptForBlocName(): Thenable<string | undefined> {
  const blocNamePromptOptions: InputBoxOptions = {
    prompt: "Page Name (Excluding the word `page`)",
    placeHolder: "splash",
  };
  return window.showInputBox(blocNamePromptOptions);
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

async function generateNewPageCode(
  name: string,
  targetDirectory: string,
) {
  const shouldCreateDirectory = workspace
    .getConfiguration("bloc")
    .get<boolean>("newBlocTemplate.createDirectory");

  parentPath = await createDirectory(targetDirectory, name);

  let index = parentPath.lastIndexOf(basePath);
  let childPath = parentPath.substring(index);
  let childFinal = childPath.substring(basePath.length + 1);

  let numPath = childFinal.split("/").length - 1;
  var importPath = "";
  for (let i = 0; i < numPath; i++) {
    importPath += "../";
  }
  pathRelative = importPath;

  blocPath = await createDirectory(parentPath, "bloc");
  componentsPath = await createDirectory(parentPath, "components");

  await Promise.all([
    createNewPageFile(name),
    createNewPageModuleFile(name),
    createNewPagePresenterFile(name),
    createNewPageStateFile(name),
    createNewPageStateFreezedFile(name),
    createExampleComponentFile(name),
  ]);
  const snakeCaseBlocName = changeCase.snakeCase(name);
  workspace.openTextDocument(`${parentPath}/${snakeCaseBlocName}_page.dart`).then(doc => {
    window.showTextDocument(doc).then(editor => {
    });
  });
}

async function createDirectory(parent: string, child: string): Promise<string> {
  let path = `${parent}/${child}`;
  var fs = require('fs');
  if (fs.existsSync(path)) {
    throw Error(`${child} already exists`);
  } else {
    await fs.mkdirSync(path)
  }
  return `${parent}/${child}`;
}



function createNewPageFile(name: string) {
  const snakeCaseBlocName = changeCase.snakeCase(name);
  const targetPath = `${parentPath}/${snakeCaseBlocName}_page.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseBlocName}_page.dart already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(targetPath, getNewPageTemplate(name, pathRelative), "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function createNewPageModuleFile(name: string) {
  const snakeCaseBlocName = changeCase.snakeCase(name);
  const targetPath = `${blocPath}/${snakeCaseBlocName}_module.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseBlocName}_module.dart already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(targetPath, getNewPageModuleTemplate(name, pathRelative), "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}
function createNewPagePresenterFile(name: string) {
  const snakeCaseBlocName = changeCase.snakeCase(name);
  const targetPath = `${blocPath}/${snakeCaseBlocName}_presenter.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseBlocName}_presenter.dart already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(targetPath, getNewPagePresenterTemplate(name, pathRelative), "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}
function createNewPageStateFile(name: string) {
  const snakeCaseBlocName = changeCase.snakeCase(name);
  const targetPath = `${blocPath}/${snakeCaseBlocName}_state.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseBlocName}_state.dart already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(targetPath, getNewPageStateTemplate(name), "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function createNewPageStateFreezedFile(name: string) {
  const snakeCaseBlocName = changeCase.snakeCase(name);
  const targetPath = `${blocPath}/${snakeCaseBlocName}_state.freezed.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseBlocName}_state.freezed.dart already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(targetPath, getNewPageStateFreezedTemplate(name), "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function createExampleComponentFile(name: string) {
  const targetPath = `${componentsPath}/example_component.dart`;
  if (existsSync(targetPath)) {
    throw Error(`example_component already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(targetPath, getExampleComponentTemplate(name), "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

