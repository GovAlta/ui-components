import React, { ReactNode } from "react";
import { Alignment, Direction, Margins, Spacing } from "../../common/styling";

export interface WCProps extends Margins {
  gap?: Spacing;
  direction?: Direction;
  alignment?: Alignment;
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
export interface GoABlockProps extends Margins {
  gap?: Spacing;
  direction?: Direction;
  alignment?: Alignment;
  testId?: string;
  children?: ReactNode;
}

// legacy
export type BlockProps = GoABlockProps;

export function GoABlock(props: GoABlockProps) {
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
