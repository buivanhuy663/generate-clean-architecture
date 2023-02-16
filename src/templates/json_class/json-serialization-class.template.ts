
import * as changeCase from "change-case";

export function getJsonSerializationClassTemplate(name: string) {
  const pascalCaseName = changeCase.pascalCase(name);
  const snakeCaseName = changeCase.snakeCase(name);

  return `import 'package:json_annotation/json_annotation.dart';

part '${snakeCaseName}.g.dart';

@JsonSerializable()
class ${pascalCaseName} {
  const ${pascalCaseName}({
    required this.example,
  });

  factory ${pascalCaseName}.fromJson(Map<String, dynamic> json) =>
      _$${pascalCaseName}FromJson(json);

  @JsonKey(name: 'example')
  final String example;

  Map<String, dynamic> toJson() => _$${pascalCaseName}ToJson(this);
}
`;
}
