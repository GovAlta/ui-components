import React from "react";
import { Spacing } from "../../common/styling";

/* eslint-disable-next-line */
interface WCProps {
  hspacing?: Spacing | "fill";
  vspacing?: Spacing;
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
export interface GoASpacerProps {
  hSpacing?: Spacing | "fill";
  vSpacing?: Spacing;
  testId?: string;
}

export type SpacerProps = GoASpacerProps;

export function GoASpacer(props: GoASpacerProps) {
  return (
    <goa-spacer
      hspacing={props.hSpacing}
      vspacing={props.vSpacing}
      data-testid={props.testId}
    />
  );
}

export default GoASpacer;
