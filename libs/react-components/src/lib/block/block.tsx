import {
  GoabBlockAlignment,
  GoabBlockDirection,
  Margins, DataAttributes,
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
  /**
   * Spacing between items. Uses design system spacing tokens.
   * @default "m"
   */
  gap?: Spacing;
  /**
   * Stacking direction of child components.
   * @default "row"
   */
  direction?: GoabBlockDirection;
  /**
   * Primary axis alignment of child components.
   * @default "normal"
   */
  alignment?: GoabBlockAlignment;
  /**
   * Sets the minimum width of the block container.
   * @default ""
   */
  minWidth?: string;
  /**
   * Sets the maximum width of the block container.
   * @default ""
   */
  maxWidth?: string;
  /**
   * Sets the width of the block container. Defaults to max-content.
   * @default ""
   */
  width?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /** TO DO: Write a description */
  children?: ReactNode;
}

export function GoabBlock({
  testId,
  children,
  ...rest
}: GoabBlockProps) {
  const _props = transformProps<WCProps>(
    { testid: testId, ...rest },
    kebab
  );

  return (
    <goa-block {..._props}>
      {children}
    </goa-block>
  );
}
