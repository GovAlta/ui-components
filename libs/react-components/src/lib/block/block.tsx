import { ABGovBlockAlignment, ABGovBlockDirection, Margins, Spacing } from "@abgov/ui-components-common";
import { ReactNode } from "react";

export interface WCProps extends Margins {
  gap?: Spacing;
  direction?: ABGovBlockDirection;
  alignment?: ABGovBlockAlignment;
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
export interface ABGovBlockProps extends Margins {
  gap?: Spacing;
  direction?: ABGovBlockDirection;
  alignment?: ABGovBlockAlignment;
  testId?: string;
  children?: ReactNode;
}

export function ABGovBlock(props: ABGovBlockProps) {
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
