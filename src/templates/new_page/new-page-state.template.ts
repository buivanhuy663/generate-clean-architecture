import * as changeCase from "change-case";


export function getNewPageStateTemplate(name: string) {
  const pascalCaseName = changeCase.pascalCase(name);
  const snakeCaseName = changeCase.snakeCase(name);
  return `import 'package:freezed_annotation/freezed_annotation.dart';

part '${snakeCaseName}_state.freezed.dart';

@freezed
class ${pascalCaseName}State with _$${pascalCaseName}State {
  factory ${pascalCaseName}State() = _${pascalCaseName}State;

  const ${pascalCaseName}State._(
      // {
      // required bool enableButton, //TODO: Example state
      // }
      );

  factory ${pascalCaseName}State.initial() => ${pascalCaseName}State(
      // enableButton: false, // TODO: init example state
      );
} 
`;
}
