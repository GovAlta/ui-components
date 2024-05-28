export type GoABTableSortDirection = "asc" | "desc" | "none";

interface WCProps {
  name?: string;
  direction?: GoABTableSortDirection;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-table-sort-header": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoABTableSortProps {
  name?: string;
  direction?: GoABTableSortDirection;
  children?: React.ReactNode;
}

export function GoABTableSortHeader({
  name,
  direction = "none",
  children,
}: GoABTableSortProps): JSX.Element {
  return (
    <goa-table-sort-header name={name} direction={direction}>
      {children}
    </goa-table-sort-header>
  );
}

export default GoABTableSortHeader;
