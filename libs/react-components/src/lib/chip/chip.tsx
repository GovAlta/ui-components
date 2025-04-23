import { GoabChipTheme, GoabChipVariant, Margins } from "../../common/types";
import { useEffect, useRef } from "react";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  leadingicon: string;
  icontheme: GoabChipTheme;
  error: boolean;
  deletable: boolean;
  content: string;
  variant?: GoabChipVariant;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-chip": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabChipProps extends Margins {
  onClick?: () => void;
  deletable?: boolean;
  leadingIcon?: string;
  iconTheme?: GoabChipTheme;
  error?: boolean;
  content: string;
  variant?: GoabChipVariant;
  testId?: string;
}

export const GoabChip = ({
  leadingIcon = "",
  iconTheme = "outline",
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
}: GoabChipProps) => {
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
      icontheme={iconTheme}
      error={error}
      deletable={deletable}
      content={content}
      variant={variant}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
    />
  );
};

export default GoabChip;
