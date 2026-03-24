import { DataAttributes, GoabTableSortDirection } from "@abgov/ui-components-common";

import type { JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  name?: string;
  direction?: GoabTableSortDirection;
}

/* eslint-disable-next-line */
export interface GoabTableSortProps extends DataAttributes {
  /**
   * Column name identifier for sorting.
   * @default ""
   */
  name?: string;
  /**
   * Sets the sort direction indicator.
   * @default "none"
   */
  direction?: GoabTableSortDirection;
  children?: React.ReactNode;
}

export function GoabTableSortHeader({
  children,
  ...rest
}: GoabTableSortProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-table-sort-header {..._props}>
      {children}
    </goa-table-sort-header>
  );
}

export default GoabTableSortHeader;
