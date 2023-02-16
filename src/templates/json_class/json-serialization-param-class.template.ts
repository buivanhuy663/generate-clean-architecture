
import * as changeCase from "change-case";

export function getJsonSerializationParamClassTemplate(name: string, jsonData: Map<String, unknown>) {
  const pascalCaseName = changeCase.pascalCase(name);
  const snakeCaseName = changeCase.snakeCase(name);

  var param = "";
  var variable = "";

  jsonData.forEach((value, key, map) => {
    const keyC = changeCase.camelCase(key.toString());
    const typeValue = checkType(value);
    param += `required this.${keyC},\n `;
    variable += `  @JsonKey(name: '${key}') \n  final ${typeValue} ${keyC}; \n\n`;
  });

  for (const key in jsonData.entries) {
    const data = jsonData.get(key);
  }


  return `import 'package:json_annotation/json_annotation.dart';

part '${snakeCaseName}.g.dart';

@JsonSerializable()
class ${pascalCaseName} {
  const ${pascalCaseName}({
    ${param}
  });

  factory ${pascalCaseName}.fromJson(Map<String, dynamic> json) =>
      _$${pascalCaseName}FromJson(json);

  ${variable}

  Map<String, dynamic> toJson() => _$${pascalCaseName}ToJson(this);
}
`;
}

function checkType(variable: unknown): String {
  if (typeof variable === "number") {
    return "int";
  }
  else if (typeof variable === "string") {
    return "String";
  }
  else if (typeof variable === "boolean") {
    return "bool";
  }
  else if (variable instanceof Array) {
    var type = "";
    variable.forEach(key => {
      if (typeof key === "string" || typeof key === "number" || typeof key === "boolean") {
        if (typeof key === "number") {
          if (type === "" || type === "List<int>") {
            type = "List<int>";
          } else {
            type = "List<dynamic>";
          }
        }
        else if (typeof key === "string") {
          if (type === "" || type === "List<String>") {
            type = "List<String>";
          } else {
            type = "List<dynamic>";
          }
        }
        else if (typeof key === "boolean") {
          if (type === "" || type === "List<bool>") {
            type = "List<bool>";
          } else {
            type = "List<dynamic>";
          }
        }
      } else {
        type = "List<dynamic>";
      }
    });
    return type;
  }
  else {
    return "dynamic";
  }
}
