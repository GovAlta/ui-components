import { GoabTableSortDirection } from "@abgov/ui-components-common";

import type { JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps {
  name?: string;
  direction?: GoabTableSortDirection;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-table-sort-header": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabTableSortProps extends DataGridProps {
  name?: string;
  direction?: GoabTableSortDirection;
  children?: React.ReactNode;
}

export function GoabTableSortHeader(props: GoabTableSortProps): JSX.Element {
  const [dataGridProps, { name, direction = "none", children }] = useDataGridProps(props);

  return (
    <goa-table-sort-header name={name} direction={direction} {...dataGridProps}>
      {children}
    </goa-table-sort-header>
  );
}

export default GoabTableSortHeader;
