import {
  GoabBlockAlignment,
  GoabBlockDirection,
  Margins,
  DataAttributes,
  Spacing,
} from "@abgov/ui-components-common";
import { ReactNode } from "react";
import { transformProps, kebab } from "../common/extract-props";

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
export interface GoabBlockProps extends Margins, DataAttributes {
  gap?: Spacing;
  direction?: GoabBlockDirection;
  alignment?: GoabBlockAlignment;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  testId?: string;
  children?: ReactNode;
}

export function GoabBlock({ testId, children, ...rest }: GoabBlockProps) {
  const _props = transformProps<WCProps>({ testid: testId, ...rest }, kebab);

  return <goa-block {..._props}>{children}</goa-block>;
}
