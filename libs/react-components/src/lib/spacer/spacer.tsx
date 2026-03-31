import {
  GoabSpacerHorizontalSpacing,
  GoabSpacerVerticalSpacing,
} from "@abgov/ui-components-common";

/* eslint-disable-next-line */
interface WCProps {
  hspacing?: GoabSpacerHorizontalSpacing;
  vspacing?: GoabSpacerVerticalSpacing;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-spacer": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabSpacerProps {
  /** Horizontal spacing. @default "none" */
  hSpacing?: GoabSpacerHorizontalSpacing;
  /** Vertical spacing. @default "none" */
  vSpacing?: GoabSpacerVerticalSpacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

export function GoabSpacer(props: GoabSpacerProps) {
  return (
    <goa-spacer
      hspacing={props.hSpacing}
      vspacing={props.vSpacing}
      testid={props.testId}
    />
  );
}

export default GoabSpacer;
