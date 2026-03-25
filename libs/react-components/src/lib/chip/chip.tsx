import { DataAttributes, GoabChipTheme, GoabChipVariant, Margins } from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";
import { transformProps, lowercase } from "../common/extract-props";

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

export interface GoabChipProps extends Margins, DataAttributes {
  onClick?: () => void;
  /**
   * @deprecated Use GoAFilterChip instead. When true, shows a delete icon and makes chip clickable.
   * @default false
   */
  deletable?: boolean;
  /**
   * @deprecated Use GoAFilterChip instead. Icon displayed at the start of the chip.
   */
  leadingIcon?: string;
  /**
   * @deprecated Use GoAFilterChip instead. The icon theme - outline or filled.
   * @default "outline"
   */
  iconTheme?: GoabChipTheme;
  /**
   * @deprecated Use GoAFilterChip instead. Shows an error state on the chip.
   * @default false
   */
  error?: boolean;
  /**
   * @deprecated Use GoAFilterChip instead. The text content displayed in the chip.
   * @required
   */
  content: string;
  /**
   * @deprecated Use GoAFilterChip instead. The chip variant style.
   */
  variant?: GoabChipVariant;
  /**
   * @deprecated Use GoAFilterChip instead. Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
}

export const GoabChip = ({
  error,
  deletable,
  onClick,
  ...rest
}: GoabChipProps) => {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!el.current) return;
    if (!onClick) return;

    const current = el.current;
    const listener = () => {
      onClick?.();
    };

    current.addEventListener("_click", listener);
    return () => {
      current.removeEventListener("_click", listener);
    };
  }, [el, onClick]);

  return (
    <goa-chip
      ref={el}
      error={error ? "true" : undefined}
      deletable={deletable ? "true" : undefined}
      {..._props}
    />
  );
};

export default GoabChip;
