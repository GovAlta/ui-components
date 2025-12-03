import {
  GoabBlockAlignment,
  GoabBlockDirection,
  Margins,
  Spacing,
} from "@abgov/ui-components-common";
import { ReactNode } from "react";

export interface WCProps extends Margins {
  gap?: Spacing;
  direction?: GoabBlockDirection;
  alignment?: GoabBlockAlignment;
  "min-width"?: string;
  "max-width"?: string;
  width?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-block": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabBlockProps extends Margins {
  gap?: Spacing;
  direction?: GoabBlockDirection;
  alignment?: GoabBlockAlignment;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  testId?: string;
  children?: ReactNode;
}

export function GoabBlock(props: GoabBlockProps) {
  return (
    <goa-block
      gap={props.gap}
      direction={props.direction}
      alignment={props.alignment}
      width={props.width}
      min-width={props.minWidth}
      max-width={props.maxWidth}
      mt={props.mt}
      mr={props.mr}
      mb={props.mb}
      ml={props.ml}
      testid={props.testId}
    >
      {props.children}
    </goa-block>
  );
}
