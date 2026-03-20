import {
  GoabIconButtonVariant,
  GoabIconSize,
  GoabIconType,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX, ReactNode } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  icon: GoabIconType;
  size?: GoabIconSize;
  variant?: GoabIconButtonVariant;
  title?: string;
  disabled?: string;
  arialabel?: string;
  action?: string;
  actionArgs?: string;
  actionArg?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-icon-button": WCProps &
        React.HTMLAttributes<HTMLButtonElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

export interface GoabIconButtonProps extends Margins, DataAttributes {
  icon: GoabIconType;
  size?: GoabIconSize;
  variant?: GoabIconButtonVariant;
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
  testId?: string;
  ariaLabel?: string;
  action?: string;
  actionArgs?: Record<string, unknown>;
  actionArg?: string;
  children?: ReactNode;
}

export function GoabIconButton({
  variant = "color",
  size = "medium",
  disabled,
  onClick,
  actionArgs,
  actionArg,
  children,
  ...rest
}: GoabIconButtonProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>({ variant, size, ...rest }, lowercase);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (!onClick) {
      return;
    }
    const current = ref.current;
    const listener = () => {
      onClick?.();
    };

    current.addEventListener("_click", listener);
    return () => {
      current.removeEventListener("_click", listener);
    };
  }, [ref, onClick]);

  return (
    <goa-icon-button
      ref={ref}
      disabled={disabled ? "true" : undefined}
      action-arg={actionArg}
      action-args={JSON.stringify(actionArgs)}
      {..._props}
    >
      {children}
    </goa-icon-button>
  );
}
