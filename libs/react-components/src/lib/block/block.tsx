import {
  GoabBlockAlignment,
  GoabBlockDirection,
  Margins, DataGridProps,
  Spacing,
} from "@abgov/ui-components-common";
import { ReactNode } from "react";
import { extractProps } from "../common/extract-props";

export interface WCProps extends Margins {
  gap?: Spacing;
  direction?: GoabBlockDirection;
  alignment?: GoabBlockAlignment;
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
export interface GoabBlockProps extends Margins, DataGridProps {
  gap?: Spacing;
  direction?: GoabBlockDirection;
  alignment?: GoabBlockAlignment;
  testId?: string;
  children?: ReactNode;
}

export function GoabBlock(props: GoabBlockProps) {
  const _props = extractProps<WCProps>(props, {
    attributeMapping: "lowercase",
  });

  return (
    <goa-block {..._props}>
      {props.children}
    </goa-block>
  );
}
