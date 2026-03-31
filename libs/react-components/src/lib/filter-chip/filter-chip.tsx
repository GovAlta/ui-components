import { useEffect, useRef } from "react";
import {
  DataAttributes,
  GoabFilterChipTheme,
  GoabIconType,
  Margins,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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

export interface GoabFilterChipProps extends Margins, DataAttributes {
  /** @required Text label of the chip. */
  content: string;
  /** Theme style of the leading icon. @default "outline" */
  iconTheme?: GoabFilterChipTheme;
  /** Shows an error state. */
  error?: boolean;
  /** Secondary text displayed in a smaller size before the main content. */
  secondaryText?: string;
  /** Icon displayed at the start of the chip. */
  leadingIcon?: GoabIconType;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Callback fired when the filter chip is clicked to remove it. */
  onClick?: () => void;
}

export const GoabFilterChip = ({
  iconTheme = "outline",
  error,
  onClick,
  ...rest
}: GoabFilterChipProps) => {
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
      version="2"
      {..._props}
    />
  );
};

export default GoabFilterChip;
