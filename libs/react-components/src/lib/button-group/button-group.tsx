import {
  GoabButtonGroupAlignment,
  GoabButtonGroupGap,
  Margins,
} from "@abgov/ui-components-common";

import type { JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps extends Margins {
  alignment: GoabButtonGroupAlignment;
  gap?: GoabButtonGroupGap;
  testid?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-button-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabButtonGroupProps extends Margins, DataGridProps {
  alignment: GoabButtonGroupAlignment;
  gap?: GoabButtonGroupGap;
  testId?: string;
  children?: React.ReactNode;
}

export function GoabButtonGroup(props: GoabButtonGroupProps): JSX.Element {
  const [dataGridProps, {
    alignment,
    gap,
    testId,
    children,
    mt,
    mr,
    mb,
    ml
  }] = useDataGridProps(props);

  return (
    <goa-button-group
      alignment={alignment}
      gap={gap}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
      version={"2"}
      {...dataGridProps}
    >
      {children}
    </goa-button-group>
  );
}

export default GoabButtonGroup;
