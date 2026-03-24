import { Margins, Spacing } from "@abgov/ui-components-common";

import type { JSX } from "react";

interface WCProps extends Margins {
  gap?: Spacing;
  minchildwidth: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-grid": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabGridProps extends Margins {
  /**
   * Gap between child items.
   * @default "m"
   */
  gap?: Spacing;
  /**
   * Minimum width of the child elements
   * @required
   * @default ""
   */
  minChildWidth: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  children?: React.ReactNode;
}

export function GoabGrid({
  gap,
  minChildWidth,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoabGridProps): JSX.Element {
  return (
    <goa-grid
      gap={gap}
      minchildwidth={minChildWidth}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
    >
      {children}
    </goa-grid>
  );
}

export default GoabGrid;
