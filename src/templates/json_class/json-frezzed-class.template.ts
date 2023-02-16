
import * as changeCase from "change-case";

export function getJsonFrezzedClassTemplate(name: string) {
  const pascalCaseName = changeCase.pascalCase(name);
  const snakeCaseName = changeCase.snakeCase(name);

  return `import 'package:freezed_annotation/freezed_annotation.dart';

part '${snakeCaseName}.freezed.dart';
part '${snakeCaseName}.g.dart';
  
@freezed
class ${pascalCaseName} with _$${pascalCaseName} {
  const factory ${pascalCaseName}({
    @JsonKey(name: 'example') required String example,
  }) = _${pascalCaseName};
  
  factory ${pascalCaseName}.fromJson(Map<String, dynamic> json) =>
      _$${pascalCaseName}FromJson(json);
}
`;
}
