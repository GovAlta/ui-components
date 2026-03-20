import { useEffect, useRef } from "react";
import {
  DataAttributes,
  GoabFilterChipTheme,
  GoabIconType,
  Margins,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../../lib/common/extract-props";

interface WCProps extends Margins {
  icontheme: GoabFilterChipTheme;
  error?: string;
  content: string;
  secondarytext?: string;
  leadingicon?: GoabIconType;
  testid?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-filter-chip": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

export interface GoabxFilterChipProps extends Margins, DataAttributes {
  onClick?: () => void;
  iconTheme?: GoabFilterChipTheme;
  error?: boolean;
  content: string;
  secondaryText?: string;
  leadingIcon?: GoabIconType;
  testId?: string;
  version?: string;
}

export const GoabxFilterChip = ({
  iconTheme = "outline",
  error,
  onClick,
  version = "2",
  ...rest
}: GoabxFilterChipProps) => {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>({ icontheme: iconTheme, ...rest }, lowercase);

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
      version={version}
      {..._props}
    />
  );
};

export default GoabxFilterChip;
