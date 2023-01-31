import React, { useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

interface WCProps extends Margins {
  ref?: React.MutableRefObject<HTMLElement | undefined>;
  itemcount: number;
  perpagecount?: number;
  pagenumber: number;
  variant?: "all" | "links-only";
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-pagination": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface PaginationProps extends Margins {
  itemCount: number;
  perPageCount?: number;
  pageNumber: number;
  variant?: "all" | "links-only";
  onChange: (page: number) => void;
}

export function GoAPagination(props: PaginationProps) {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const changeListener = (e: Event) => {
      const { page } = (e as CustomEvent).detail;
      props.onChange(page);
    };

    current.addEventListener("_change", changeListener);
    return () => {
      current.removeEventListener("_change", changeListener);
    };
  }, [ref, props.onChange]);

  return (
    <goa-pagination
      ref={ref}
      itemcount={props.itemCount}
      perpagecount={props.perPageCount}
      pagenumber={props.pageNumber}
      variant={props.variant}
      mt={props.mt}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}
    />
  );
}

export default GoAPagination;
