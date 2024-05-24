import {
  GoABBlockAlignment,
  GoABBlockDirection,
  Margins,
  Spacing,
} from "@abgov/ui-components-common";
import { ReactNode } from "react";
import { Alignment, Direction, Margins, Spacing } from "../../common/styling";

export interface WCProps extends Margins {
  gap?: Spacing;
  direction?: GoABBlockDirection;
  alignment?: GoABBlockAlignment;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-block": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoABBlockProps extends Margins {
  gap?: Spacing;
  direction?: GoABBlockDirection;
  alignment?: GoABBlockAlignment;
  testId?: string;
  children?: ReactNode;
}

export function GoABBlock(props: GoABBlockProps) {
  return (
    <goa-block
      gap={props.gap}
      direction={props.direction}
      alignment={props.alignment}
      mt={props.mt}
      mr={props.mr}
      mb={props.mb}
      ml={props.ml}
      data-testid={props.testId}
    >
      {props.children}
    </goa-block>
  );
}
