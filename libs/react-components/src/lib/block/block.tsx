import {
  GoabBlockAlignment,
  GoabBlockDirection,
  Margins,
  Spacing,
} from "@abgov/ui-components-common";
import { ReactNode } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

export interface WCProps extends Margins {
  gap?: Spacing;
  direction?: GoabBlockDirection;
  alignment?: GoabBlockAlignment;
  "min-width"?: string;
  "max-width"?: string;
  width?: string;
  testid?: string;
  version?: string;
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
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  testId?: string;
  children?: ReactNode;
}

export function GoabBlock(props: GoabBlockProps) {
  const [dataGridProps, { gap, direction, alignment, mt, mr, mb, ml, testId, width, minWidth, maxWidth, children}] = useDataGridProps(props);

  return (
    <goa-block
      gap={gap}
      direction={direction}
      alignment={alignment}
      min-width={minWidth}
      max-width={maxWidth}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
      width={width}
      version={"2"}
      {...dataGridProps}
    >
      {children}
    </goa-block>
  );
}
