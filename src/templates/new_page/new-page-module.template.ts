import * as changeCase from "change-case";


export function getNewPageModuleTemplate(name: string, pathRelative: String) {
  const pascalCaseName = changeCase.pascalCase(name);
  const snakeCaseName = changeCase.snakeCase(name);
  return `import '../../../../${pathRelative}injection/injector.dart';
import '../../../${pathRelative}core/base_page/base_bloc/base_module.dart';
import '${snakeCaseName}_presenter.dart';

class ${pascalCaseName}Module extends BaseModule<${pascalCaseName}Presenter> {
  @override
  void register() {
    //TODO: Sign up for the site's presenter here. Note that it is necessary
    //to strictly manage whether this presenter is a factory or a singleton
    injector.registerFactory<${pascalCaseName}Presenter>(
      () => ${pascalCaseName}Presenter(),
    );
  }
}
`;
}
