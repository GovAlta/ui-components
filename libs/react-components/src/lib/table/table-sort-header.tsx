import { GoabTableSortDirection } from "@abgov/ui-components-common";

import type { JSX } from "react";

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
export interface GoabTableSortProps {
  name?: string;
  direction?: GoabTableSortDirection;
  children?: React.ReactNode;
}

export function GoabTableSortHeader({
  name,
  direction = "none",
  children,
}: GoabTableSortProps): JSX.Element {
  return (
    <goa-table-sort-header name={name} direction={direction}>
      {children}
    </goa-table-sort-header>
  );
}

export default GoabTableSortHeader;
