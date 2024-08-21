import { Margins } from "@abgov/ui-components-common";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-divider": Margins & React.HTMLAttributes<HTMLElement>;
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
      data-testid={props.testId}
    />
  );
}

export default GoabDivider;
