import { ReactNode, useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

export type GoATableVariant = "normal" | "relaxed";

// legacy naming
export type TableVariant = GoATableVariant;

interface WCProps extends Margins {
  ref?: React.MutableRefObject<HTMLElement | null>;
  width?: string;
  stickyheader?: boolean;
  variant?: GoATableVariant;
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
export interface GoATableProps extends Margins {
  width?: string;
  onSort?: (sortBy: string, sortDir: number) => void;
  // stickyHeader?: boolean; TODO: enable this later
  variant?: GoATableVariant;
  testId?: string;
  children?: ReactNode;
}

// legacy name
export type TableProps = GoATableProps;

export function GoATable({onSort, ...props}: GoATableProps) {
  const ref = useRef<HTMLTableElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const sortListener = (e: unknown) => {
      const { sortBy, sortDir } = (e as CustomEvent).detail;
      onSort?.(sortBy, sortDir);
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

export default GoATable;
