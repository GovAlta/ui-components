import {
  GoabTableOnSortDetail,
  GoabTableOnMultiSortDetail,
  GoabTableSortMode,
  GoabTableVariant,
  Margins,
} from "@abgov/ui-components-common";
import { ReactNode, useEffect, useRef } from "react";

interface WCProps extends Margins {
  ref?: React.RefObject<HTMLElement | null>;
  width?: string;
  stickyheader?: string;
  variant?: GoabTableVariant;
  "sort-mode"?: GoabTableSortMode;
  testid?: string;
  striped?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-table": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabTableProps extends Margins {
  /** Width of the table. By default it will fit the enclosed content. */
  width?: string;
  /** Callback fired when a single-column sort header is clicked. */
  onSort?: (detail: GoabTableOnSortDetail) => void;
  /** Callback fired when multi-column sorting changes. */
  onMultiSort?: (detail: GoabTableOnMultiSortDetail) => void;
  /** Sort mode: "single" allows one column, "multi" allows up to 2 columns. @default "single" */
  sortMode?: GoabTableSortMode;
  // stickyHeader?: boolean; TODO: enable this later
  /** A relaxed variant of the table with more vertical padding for the cells. @default "normal" */
  variant?: GoabTableVariant;
  /** When true, alternates row background colors for improved readability. */
  striped?: boolean;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Content rendered inside the table (table rows, headers, etc.). */
  children?: ReactNode;
}

// legacy name
export type TableProps = GoabTableProps;

/** A set of structured data that is easy for a user to scan, examine, and compare. */
export function GoabTable({ onSort, onMultiSort, sortMode, ...props }: GoabTableProps) {
  const ref = useRef<HTMLTableElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const sortListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabTableOnSortDetail>).detail;
      onSort?.(detail);
    };
    const multiSortListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabTableOnMultiSortDetail>).detail;
      onMultiSort?.(detail);
    };

    current.addEventListener("_sort", sortListener);
    current.addEventListener("_multisort", multiSortListener);
    return () => {
      current.removeEventListener("_sort", sortListener);
      current.removeEventListener("_multisort", multiSortListener);
    };
  }, [ref, onSort, onMultiSort]);

  return (
    <goa-table
      ref={ref}
      width={props.width}
      // TODO: Enable this later if needed
      // stickyheader={props.stickyHeader ? "true" : undefined}
      variant={props.variant}
      sort-mode={sortMode}
      striped={props.striped ? "true" : undefined}
      testid={props.testId}
      mt={props.mt}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}
      version="2"
    >
      <table style={{ width: "100%" }}>{props.children}</table>
    </goa-table>
  );
}

export default GoabTable;
