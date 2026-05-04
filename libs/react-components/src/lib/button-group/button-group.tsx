import {
  GoabButtonGroupAlignment,
  GoabButtonGroupGap,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";

import type { JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  alignment: GoabButtonGroupAlignment;
  gap?: GoabButtonGroupGap;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-button-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabButtonGroupProps extends Margins, DataAttributes {
  /** @required Positions the button group in the page layout. */
  alignment: GoabButtonGroupAlignment;
  /** Sets the spacing between buttons in the button group. @default "relaxed" */
  gap?: GoabButtonGroupGap;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Button components to render inside the group. */
  children?: React.ReactNode;
}

/** Display multiple related actions stacked or in a horizontal row to help with arrangement and spacing. */
export function GoabButtonGroup({
  children,
  ...rest
}: GoabButtonGroupProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return <goa-button-group {..._props}>{children}</goa-button-group>;
}

export default GoabButtonGroup;
