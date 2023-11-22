import { Margins } from "../../common/styling";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-divider": Margins & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoADividerProps extends Margins {
  testId?: string;
}

export function GoADivider(props: GoADividerProps) {
  return (
    <goa-divider
      mt={props.mt}
      mr={props.mr}
      mb={props.mb}
      ml={props.ml}
      data-testid={props.testId}
    />
  );
}

export default GoADivider;
