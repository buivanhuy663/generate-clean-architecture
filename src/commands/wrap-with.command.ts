import { wrapWith } from "../utils";

const blocBuilderSnippet = (widget: string) => {
  return `BlocBuilder<\${1:Name}\${2|Presenter,Cubit|}, $1State>(
  bloc: presenter,
  buildWhen: (previous, current) => false,
  builder: (context, state) {
    return ${widget};
  },
)`;
};

export const wrapWithBlocBuilder = async () => wrapWith(blocBuilderSnippet);
