import { useEffect, useRef } from "react";
import { DataGridProps, GoabFilterChipTheme, Margins } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps extends Margins {
  icontheme: GoabFilterChipTheme;
  error?: string;
  content: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-filter-chip": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

export interface GoabFilterChipProps extends Margins, DataGridProps {
  onClick?: () => void;
  iconTheme?: GoabFilterChipTheme;
  error?: boolean;
  content: string;
  testId?: string;
}

export const GoabFilterChip = ({
  iconTheme = "outline",
  ...props
}: GoabFilterChipProps) => {
  const el = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(
    { iconTheme, ...props },
    {
      exclude: ["error", "onClick"],
      attributeMapping: "lowercase",
    }
  );

  useEffect(() => {
    if (!el.current) return;
    if (!props.onClick) return;

    const current = el.current;

    current.addEventListener("_click", props.onClick);
    return () => {
      current.removeEventListener("_click", props.onClick!);
    };
  }, [el, props.onClick]);

  return (
    <goa-filter-chip
      ref={el}
      error={props.error ? "true" : undefined}
      {..._props}
    />
  );
};

export default GoabFilterChip;
