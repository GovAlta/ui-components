import { GoabPaginationOnChangeDetail, Margins } from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

/* eslint-disable-next-line */
export interface GoabPaginationProps extends Margins {
  itemCount: number;
  perPageCount?: number;
  pageNumber: number;
  variant?: "all" | "links-only";
  onChange: (detail: GoabPaginationOnChangeDetail) => void;
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
    />
  );
}

export default GoabPagination;
