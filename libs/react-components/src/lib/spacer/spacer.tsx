import {
  GoabSpacerHorizontalSpacing,
  GoabSpacerVerticalSpacing,
} from "@abgov/ui-components-common";

/* eslint-disable-next-line */
interface WCProps {
  hspacing?: GoabSpacerHorizontalSpacing;
  vspacing?: GoabSpacerVerticalSpacing;
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
export interface GoabSpacerProps {
  hSpacing?: GoabSpacerHorizontalSpacing;
  vSpacing?: GoabSpacerVerticalSpacing;
  testId?: string;
}

export function GoabSpacer(props: GoabSpacerProps) {
  return (
    <goa-spacer
      hspacing={props.hSpacing}
      vspacing={props.vSpacing}
      data-testid={props.testId}
    />
  );
}

export default GoabSpacer;
