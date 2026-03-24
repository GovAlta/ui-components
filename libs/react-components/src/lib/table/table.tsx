import {
  GoabTableOnSortDetail,
  GoabTableVariant,
  Margins,
} from "@abgov/ui-components-common";
import { ReactNode, useEffect, useRef } from "react";

/* eslint-disable-next-line */
export interface GoabTableProps extends Margins {
  /**
   * Width of the table. By default it will fit the enclosed content.
   * @default ""
   */
  width?: string;
  onSort?: (detail: GoabTableOnSortDetail) => void;
  // stickyHeader?: boolean; TODO: enable this later
  /**
   * A relaxed variant of the table with more vertical padding for the cells.
   * @default "normal"
   */
  variant?: GoabTableVariant;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  children?: ReactNode;
}

// legacy name
export type TableProps = GoabTableProps;

export function GoabTable({ onSort, ...props }: GoabTableProps) {
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

    current.addEventListener("_sort", sortListener);
    return () => {
      current.removeEventListener("_sort", sortListener);
    };
  }, [ref, onSort]);

  return (
    <goa-table
      ref={ref}
      width={props.width}
      // TODO: Enable this later if needed
      // stickyheader={props.stickyHeader ? "true" : undefined}
      variant={props.variant}
      testid={props.testId}
      mt={props.mt}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}
    >
      <table style={{ width: "100%" }}>{props.children}</table>
    </goa-table>
  );
}

export default GoabTable;
