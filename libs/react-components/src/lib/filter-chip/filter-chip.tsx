import { useEffect, useRef } from "react";
import { Margins, GoabFilterChipTheme } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
  icontheme: GoabFilterChipTheme;
  error?: string;
  content: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-filter-chip": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabFilterChipProps extends Margins {
  onClick?: () => void;
  iconTheme?: GoabFilterChipTheme;
  error?: boolean;
  content: string;
  testId?: string;
}

export const GoabFilterChip = ({
  iconTheme = "outline",
  error,
  content,
  onClick,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabFilterChipProps) => {
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
      error={error ? "true" : undefined}
      content={content}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
    />
  );
};

export default GoabFilterChip;
