import { DataGridProps, GoabChipTheme, GoabChipVariant, Margins } from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";
import { extractProps } from "../common/extract-props";

interface WCProps extends Margins {
  leadingicon?: string;
  icontheme?: GoabChipTheme;
  error?: string;
  deletable?: string;
  content: string;
  variant?: GoabChipVariant;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-chip": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

export interface GoabChipProps extends Margins, DataGridProps {
  onClick?: () => void;
  deletable?: boolean;
  leadingIcon?: string;
  iconTheme?: GoabChipTheme;
  error?: boolean;
  content: string;
  variant?: GoabChipVariant;
  testId?: string;
}

export const GoabChip = (props: GoabChipProps) => {
  const el = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["error", "deletable", "onClick"],
    attributeMapping: "lowercase",
  });

  useEffect(() => {
    if (!el.current) return;
    if (!props.onClick) return;

    const current = el.current;
    const listener = () => {
      props.onClick?.();
    };

    current.addEventListener("_click", listener);
    return () => {
      current.removeEventListener("_click", listener);
    };
  }, [el, props.onClick]);

  return (
    <goa-chip
      ref={el}
      error={props.error ? "true" : undefined}
      deletable={props.deletable ? "true" : undefined}
      {..._props}
    />
  );
};

export default GoabChip;
