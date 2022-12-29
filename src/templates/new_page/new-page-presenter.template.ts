import * as changeCase from "change-case";


export function getNewPagePresenterTemplate(name: string, pathRelative: string) {
  const pascalCaseName = changeCase.pascalCase(name);
  const snakeCaseName = changeCase.snakeCase(name);
  return `import 'package:flutter/material.dart';

import '../../../${pathRelative}core/base_page/base_bloc/base_presenter.dart';
import '${snakeCaseName}_state.dart';
  
class ${pascalCaseName}Presenter extends BasePresenter<${pascalCaseName}State> {
  ${pascalCaseName}Presenter(
      // TODO: create parameter here.
      {
    @visibleForTesting ${pascalCaseName}State? state,
  }) : super(state ?? ${pascalCaseName}State.initial());
}  
`;
}
