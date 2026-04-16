import { Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  testid?: string;
}
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-divider": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabDividerProps extends Margins {
  testId?: string;
}

export function GoabDivider(props: GoabDividerProps) {
  return (
    <goa-divider
      mt={props.mt}
      mr={props.mr}
      mb={props.mb}
      ml={props.ml}
      testid={props.testId}
    />
  );
}

export default GoabDivider;
