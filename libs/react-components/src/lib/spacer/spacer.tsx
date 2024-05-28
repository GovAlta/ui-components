import {
  GoABSpacerHorizontalSpacing,
  GoABSpacerVerticalSpacing,
} from "@abgov/ui-components-common";

/* eslint-disable-next-line */
interface WCProps {
  hspacing?: GoABSpacerHorizontalSpacing;
  vspacing?: GoABSpacerVerticalSpacing;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-spacer": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoABSpacerProps {
  hSpacing?: GoABSpacerHorizontalSpacing;
  vSpacing?: GoABSpacerVerticalSpacing;
  testId?: string;
}

export function GoABSpacer(props: GoABSpacerProps) {
  return (
    <goa-spacer
      hspacing={props.hSpacing}
      vspacing={props.vSpacing}
      data-testid={props.testId}
    />
  );
}

export default GoABSpacer;
