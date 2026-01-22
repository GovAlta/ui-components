import {
  GoabTableOnSortDetail,
  GoabTableVariant,
  Margins,
} from "@abgov/ui-components-common";
import { ReactNode, useEffect, useRef } from "react";

interface WCProps extends Margins {
  ref?: React.RefObject<HTMLElement | null>;
  width?: string;
  stickyheader?: string;
  variant?: GoabTableVariant;
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
export interface GoabxTableProps extends Margins {
  width?: string;
  onSort?: (detail: GoabTableOnSortDetail) => void;
  // stickyHeader?: boolean; TODO: enable this later
  variant?: GoabTableVariant;
  striped?: boolean;
  testId?: string;
  version?: string;
  children?: ReactNode;
}

// legacy name
export type TableProps = GoabxTableProps;

export function GoabxTable({ onSort, version = "2", ...props }: GoabxTableProps) {
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
      striped={props.striped ? "true" : undefined}
      testid={props.testId}
      mt={props.mt}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}
      version={version}
    >
      <table style={{ width: "100%" }}>{props.children}</table>
    </goa-table>
  );
}

export default GoabxTable;
