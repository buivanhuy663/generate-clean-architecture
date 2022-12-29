import * as changeCase from "change-case";
import * as moment from 'moment';


export function getNewPageTemplate(name: string, pathRelative: string) {
  const pascalCaseName = changeCase.pascalCase(name);
  const snakeCaseName = changeCase.snakeCase(name);
  let formattedDate = (moment(Date())).format('DD/MM/YYYY');
  return `import 'package:flutter/material.dart';

import './bloc/${snakeCaseName}_module.dart';
import './bloc/${snakeCaseName}_presenter.dart';
import './bloc/${snakeCaseName}_state.dart';
import './components/example_component.dart';
import '../../${pathRelative}core/base_page/base_page.dart';
import '../../${pathRelative}resources/resources.dart';

/// Create at:   ${formattedDate}
/// Page:        [${pascalCaseName}Page]
/// Presenter:   [${pascalCaseName}Module]
/// Presenter:   [${pascalCaseName}Presenter]
/// State:       [${pascalCaseName}State]
/// Description:
///
class ${pascalCaseName}Page extends BasePage {
  const ${pascalCaseName}Page({Key? key}) : super(key: key);

  @override
  State<${pascalCaseName}Page> createState() => _${pascalCaseName}PageState();
}

class _${pascalCaseName}PageState
    extends BasePageState<${pascalCaseName}Page, ${pascalCaseName}Presenter> {
  @override
  PreferredSizeWidget? buildAppBar(BuildContext context) => AppBar(
        backgroundColor: AppColors.get.background,
        title: const Text('New page'), //TODO: (remove) App bar of new page
        centerTitle: true,
      );

  @override
  Widget buildBody(BuildContext context) => ExampleComponent(
        presenter: presenter,
        //TODO: (remove) presenter will automatically be initialized
        //after initState() is called. No need to initialize this value
      );

  @override
  void handlerFutureError(BuildContext context, Object? error) {
    // TODO: (remove) Example of an overridden method
  }

  @override
  bool get resizeToAvoidBottomInset => true;
}

///==========================================================================///
///=> Script of the [${pascalCaseName}Page]
///==========================================================================///
extension _${pascalCaseName}PageScript on _${pascalCaseName}PageState {
  void onPressButton() {
    //TODO: (remove) Example of a self-defined method
  }
}  
`;
}
