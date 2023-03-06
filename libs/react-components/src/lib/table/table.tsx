import React, { ReactNode, useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

export type TableVariant = "normal" | "relaxed";

interface WCProps extends Margins {
  ref?: React.MutableRefObject<HTMLElement | null>;
  width?: string;
  stickyheader?: boolean;
  variant?: TableVariant;
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
export interface TableProps extends Margins {
  width?: string;
  onSort?: (sortBy: string, sortDir: number) => void;
  // stickyHeader?: boolean; TODO: enable this later
  variant?: TableVariant;
  testId?: string;
  children: ReactNode;
}

export function GoATable(props: TableProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const sortListener = (e: unknown) => {
      const { sortBy, sortDir } = (e as CustomEvent).detail;
      props.onSort?.(sortBy, sortDir);
    };

    current.addEventListener("_sort", sortListener);
    return () => {
      current.removeEventListener("_sort", sortListener);
    };
  }, [ref, props.onSort]);

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
      <template>
        <table>{props.children}</table>
      </template>
    </goa-table>
  );
}

export default GoATable;
