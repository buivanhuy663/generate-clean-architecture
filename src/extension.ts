// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { commands, languages } from "vscode";
import {
	createNewJsonDataFreezedClass,
	createNewJsonDataSerializableClass,
	createNewPage,
	wrapWithBlocBuilder
} from "./commands";

import { BlocCodeActionProvider } from "./code-actions";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "generate-clean-architecture" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('generate-clean-architecture.helloWorld', () => {
	// The code you place here will be executed every time your command is executed
	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from generator_page!');
	// });

	context.subscriptions.push(
		commands.registerCommand("clean-architecture.create-new-page", createNewPage),
		commands.registerCommand("clean-architecture.create-json-data-freezed", createNewJsonDataFreezedClass),
		commands.registerCommand("clean-architecture.create-json-data-serializable", createNewJsonDataSerializableClass),
		commands.registerCommand("clean-architecture.wrap-blocbuilder", wrapWithBlocBuilder),
		languages.registerCodeActionsProvider(
			DART_MODE,
			new BlocCodeActionProvider()
		),
	);
}

const DART_MODE = { language: "dart", scheme: "file" };

// This method is called when your extension is deactivated
export function deactivate() { }
