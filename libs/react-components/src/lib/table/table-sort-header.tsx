export type ABGovTableSortDirection = "asc" | "desc" | "none";

interface WCProps {
  name?: string;
  direction?: ABGovTableSortDirection;
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
export interface ABGovTableSortProps {
  name?: string;
  direction?: ABGovTableSortDirection;
  children?: React.ReactNode;
}

export function ABGovTableSortHeader({
  name,
  direction = "none",
  children,
}: ABGovTableSortProps): JSX.Element {
  return (
    <goa-table-sort-header name={name} direction={direction}>
      {children}
    </goa-table-sort-header>
  );
}

export default ABGovTableSortHeader;
