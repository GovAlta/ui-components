import { DataGridProps, GoabTableSortDirection } from "@abgov/ui-components-common";

import type { JSX } from "react";
import { extractProps } from "../common/extract-props";

interface WCProps {
  name?: string;
  direction?: GoabTableSortDirection;
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
  const _props = extractProps<WCProps>(props, {
    attributeMapping: "lowercase",
  });

  return (
    <goa-table-sort-header {..._props}>
      {props.children}
    </goa-table-sort-header>
  );
}

export default GoabTableSortHeader;
