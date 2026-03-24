import { GoabPaginationOnChangeDetail, Margins } from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

interface WCProps extends Margins {
  ref?: React.RefObject<HTMLElement | null>;
  itemcount: number;
  perpagecount?: number;
  pagenumber: number;
  variant?: "all" | "links-only";
  testid?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-pagination": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabxPaginationProps extends Margins {
  /**
   * Total number of data items within all pages.
   * @required
   */
  itemCount: number;
  /**
   * Number of data items shown per page.
   * @default 10
   */
  perPageCount?: number;
  /**
   * The current page being viewed (non-zero based).
   * @required
   */
  pageNumber: number;
  /**
   * Controls which nav controls are visible.
   * @default "all"
   */
  variant?: "all" | "links-only";
  onChange: (detail: GoabPaginationOnChangeDetail) => void;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  version?: string;
}

// legacy
export type PaginationProps = GoabxPaginationProps;

export function GoabxPagination({
  onChange,
  version = "2",
  ...props
}: GoabxPaginationProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const changeListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabPaginationOnChangeDetail>).detail;
      onChange(detail);
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
      testid={props.testId}
      version={version}
    />
  );
}

export default GoabxPagination;
