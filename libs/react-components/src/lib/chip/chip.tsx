import { GoABChipVariant, Margins } from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  leadingicon: string;
  error: boolean;
  deletable: boolean;
  content: string;
  variant?: GoABChipVariant;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-chip": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABChipProps extends Margins {
  onClick?: () => void;
  deletable?: boolean;
  leadingIcon?: string;
  error?: boolean;
  content: string;
  variant?: GoABChipVariant;
  testId?: string;
}

export const GoABChip = ({
  leadingIcon = "",
  deletable = false,
  error = false,
  variant,
  content,
  onClick,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoABChipProps) => {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) return;
    if (!onClick) return;

    const current = el.current;
    const listener = () => {
      onClick();
    };

    current.addEventListener("_click", listener);
    return () => {
      current.removeEventListener("_click", listener);
    };
  }, [el, onClick]);

  return (
    <goa-chip
      ref={el}
      leadingicon={leadingIcon}
      error={error}
      deletable={deletable}
      content={content}
      variant={variant}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    />
  );
};

export default GoABChip;
