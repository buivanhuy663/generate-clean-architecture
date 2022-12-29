
import * as changeCase from "change-case";

export function getExampleComponentTemplate(name: string) {
  const pascalCaseName = changeCase.pascalCase(name);
  const snakeCaseName = changeCase.snakeCase(name);
  return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../bloc/${snakeCaseName}_presenter.dart';
import '../bloc/${snakeCaseName}_state.dart';

class ExampleComponent extends StatelessWidget {
  const ExampleComponent({
    required this.presenter,
    Key? key,
  }) : super(key: key);

  final ${pascalCaseName}Presenter presenter;

  //TODO: An example of a childe component whose state is wrapped by BlocBuilder
  @override
  Widget build(BuildContext context) =>
      BlocBuilder<${pascalCaseName}Presenter, ${pascalCaseName}State>(
        bloc: presenter,
        buildWhen: (previous, current) => false,
        builder: (context, state) => Container(
          width: double.infinity,
          height: double.infinity,
          color: Colors.green,
        ),
      );
}
`;
}
