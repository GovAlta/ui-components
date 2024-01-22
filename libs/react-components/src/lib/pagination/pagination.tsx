import { useEffect, useRef } from "react";
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
export interface GoAPaginationProps extends Margins {
  itemCount: number;
  perPageCount?: number;
  pageNumber: number;
  variant?: "all" | "links-only";
  onChange: (page: number) => void;
  testId?: string;
}

// legacy
export type PaginationProps = GoAPaginationProps;

export function GoAPagination({onChange, ...props}: GoAPaginationProps) {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const changeListener = (e: Event) => {
      const { page } = (e as CustomEvent).detail;
      onChange(page);
    };

    current.addEventListener("_change", changeListener);
    return () => {
      current.removeEventListener("_change", changeListener);
    };
  }, [ref, onChange]);

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
      data-testid={props.testId}
    />
  );
}

export default GoAPagination;
