import { GoABTableOnSortDetail, GoABTableVariant, Margins } from "@abgov/ui-components-common";
import { ReactNode, useEffect, useRef } from "react";

interface WCProps extends Margins {
  ref?: React.MutableRefObject<HTMLElement | null>;
  width?: string;
  stickyheader?: boolean;
  variant?: GoABTableVariant;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-table": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoABTableProps extends Margins {
  width?: string;
  onSort?: (detail: GoABTableOnSortDetail) => void;
  // stickyHeader?: boolean; TODO: enable this later
  variant?: GoABTableVariant;
  testId?: string;
  children?: ReactNode;
}

// legacy name
export type TableProps = GoABTableProps;

export function GoABTable({ onSort, ...props }: GoABTableProps) {
  const ref = useRef<HTMLTableElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const sortListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoABTableOnSortDetail>).detail;
      onSort?.(detail);
    };

    current.addEventListener("_sort", sortListener);
    return () => {
      current.removeEventListener("_sort", sortListener);
    };
  }, [ref, onSort]);

  return (
    <goa-table
      ref={ref}
      width={props.width}
      stickyheader={false}
      variant={props.variant}
      data-testid={props.testId}
      mt={props.mt}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}
    >
      <table style={{ width: "100%" }}>{props.children}</table>
    </goa-table>
  );
}

export default GoABTable;
