import { GoabTableOnSortDetail, GoabTableVariant, Margins } from "../../common/types";
import { ReactNode, useEffect, useRef } from "react";

interface WCProps extends Margins {
  ref?: React.MutableRefObject<HTMLElement | null>;
  width?: string;
  stickyheader?: boolean;
  variant?: GoabTableVariant;
  testid?: string;
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
export interface GoabTableProps extends Margins {
  width?: string;
  onSort?: (detail: GoabTableOnSortDetail) => void;
  // stickyHeader?: boolean; TODO: enable this later
  variant?: GoabTableVariant;
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
      stickyheader={false}
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
