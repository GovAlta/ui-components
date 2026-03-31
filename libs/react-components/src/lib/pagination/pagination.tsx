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
export interface GoabPaginationProps extends Margins {
  /** @required Total number of data items within all pages. */
  itemCount: number;
  /** @required The current page being viewed (non-zero based). */
  pageNumber: number;
  /** @required Callback fired when the user navigates to a different page. */
  onChange: (detail: GoabPaginationOnChangeDetail) => void;
  /** Number of data items shown per page. @default 10 */
  perPageCount?: number;
  /** Controls which nav controls are visible. @default "all" */
  variant?: "all" | "links-only";
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

// legacy
export type PaginationProps = GoabPaginationProps;

export function GoabPagination({ onChange, ...props }: GoabPaginationProps) {
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
      version="2"
    />
  );
}

export default GoabPagination;
