import { useEffect, useRef } from "react";
import { DataAttributes, GoabFilterChipTheme, Margins } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  icontheme: GoabFilterChipTheme;
  error?: string;
  content: string;
  testid?: string;
}

export interface GoabFilterChipProps extends Margins, DataAttributes {
  onClick?: () => void;
  iconTheme?: GoabFilterChipTheme;
  error?: boolean;
  content: string;
  testId?: string;
}

export const GoabFilterChip = ({
  iconTheme = "outline",
  error,
  onClick,
  ...rest
}: GoabFilterChipProps) => {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(
    { icontheme: iconTheme, ...rest },
    lowercase
  );

  useEffect(() => {
    if (!el.current) return;
    if (!onClick) return;

    const current = el.current;

    current.addEventListener("_click", onClick);
    return () => {
      current.removeEventListener("_click", onClick!);
    };
  }, [el, onClick]);

  return (
    <goa-filter-chip
      ref={el}
      error={error ? "true" : undefined}
      {..._props}
    />
  );
};

export default GoabFilterChip;
