import { DataAttributes, GoabTableSortDirection } from "@abgov/ui-components-common";

import type { JSX } from "react";
import { transformProps, lowercase } from "../../lib/common/extract-props";

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
export interface GoabxTableSortProps extends DataAttributes {
  name?: string;
  direction?: GoabTableSortDirection;
  children?: React.ReactNode;
}

export function GoabxTableSortHeader({
  children,
  ...rest
}: GoabxTableSortProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return <goa-table-sort-header {..._props}>{children}</goa-table-sort-header>;
}

export default GoabxTableSortHeader;
