import { Margins } from "@abgov/ui-components-common";

import type { JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps extends Margins {
  elevation?: number;
  width?: string;
  children: React.ReactNode;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardProps extends Margins, DataGridProps {
  elevation?: number;
  width?: string;
  testId?: string;
  children?: React.ReactNode;
}

export function GoabCard(props: GoabCardProps): JSX.Element {
  const [dataGridProps, {
    elevation,
    width,
    mt,
    mr,
    mb,
    ml,
    testId,
    children
  }] = useDataGridProps(props);

  return (
    <goa-card
      width={width}
      elevation={elevation}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
      {...dataGridProps}
    >
      {children}
    </goa-card>
  );
}

export default GoabCard;
