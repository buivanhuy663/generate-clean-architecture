import { CodeAction, CodeActionKind, CodeActionProvider, window } from "vscode";
import { getSelectedText } from "../utils";

const blocListenerRegExp = new RegExp("^BlocListener(\\<.*\\>)*\\(.*\\)", "ms");
const blocProviderRegExp = new RegExp(
  "^BlocProvider(\\<.*\\>)*(\\.value)*\\(.*\\)",
  "ms"
);
const repositoryProviderRegExp = new RegExp(
  "^RepositoryProvider(\\<.*\\>)*(\\.value)*\\(.*\\)",
  "ms"
);

export class BlocCodeActionProvider implements CodeActionProvider {
  public provideCodeActions(): CodeAction[] {
    const editor = window.activeTextEditor;
    if (!editor) { return []; }

    const selectedText = editor.document.getText(getSelectedText(editor));
    if (selectedText === "") { return []; }

    return [
      {
        command: "clean-architecture.wrap-blocbuilder",
        title: "Boiler: Wrap with BlocBuilder",
      }
    ].map((c) => {
      let action = new CodeAction(c.title, CodeActionKind.Refactor);
      action.command = {
        command: c.command,
        title: c.title,
      };
      return action;
    });
  }
}
