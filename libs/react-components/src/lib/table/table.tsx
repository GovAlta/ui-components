import { GoabTableOnSortDetail, GoabTableVariant, Margins } from "@abgov/ui-components-common";
import { ReactNode, useEffect, useRef } from "react";

interface WCProps extends Margins {
  ref?: React.RefObject<HTMLElement | null>;
  width?: string;
  stickyheader?: string;
  variant?: GoabTableVariant;
  testid?: string;
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
  width?: string;
  onSort?: (detail: GoabTableOnSortDetail) => void;
  stickyHeader?: boolean;
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
      // TODO: Enable this later if needed
      // stickyheader={toOptionalBooleanAsString(props.stickyHeader)}
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
