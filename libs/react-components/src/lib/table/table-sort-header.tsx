export type GoATableSortDirection = "asc" | "desc" | "none";

interface WCProps {
  name?: string;
  direction?: GoATableSortDirection;
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
export interface GoATableSortProps {
  name?: string;
  direction?: GoATableSortDirection;
  children?: React.ReactNode;
}

export function GoATableSortHeader({
  name,
  direction = "none",
  children,
}: GoATableSortProps): JSX.Element {
  return (
    <goa-table-sort-header name={name} direction={direction}>
      {children}
    </goa-table-sort-header>
  );
};

export default GoATableSortHeader;
