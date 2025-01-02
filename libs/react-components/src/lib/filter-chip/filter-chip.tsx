import { useEffect, useRef } from "react";
import { Margins, GoabFilterChipTheme } from "@abgov/ui-components-common";

export type GoAFilterChipTheme = "outline" | "filled";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  icontheme: GoabFilterChipTheme;
  error: boolean;
  content: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-filter-chip": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoAFilterChipProps extends Margins {
  onClick?: () => void;
  iconTheme?: GoAFilterChipTheme;
  error?: boolean;
  content: string;
  testId?: string;
}

export const GoAFilterChip = ({
  iconTheme = "outline",
  error = false,
  content,
  onClick,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoAFilterChipProps) => {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) return;
    if (!onClick) return;

    const current = el.current;

    current.addEventListener("_click", onClick);
    return () => {
      current.removeEventListener("_click", onClick);
    };
  }, [el, onClick]);

  return (
    <goa-filter-chip
      ref={el}
      icontheme={iconTheme}
      error={error}
      content={content}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    />
  );
};

export default GoAFilterChip;
