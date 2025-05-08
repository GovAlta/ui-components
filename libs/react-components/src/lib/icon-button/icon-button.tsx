import {
  GoabIconButtonVariant,
  GoabIconSize,
  GoabIconType,
  Margins,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX, ReactNode } from "react";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
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
      "goa-icon-button": WCProps & React.HTMLAttributes<HTMLButtonElement>;
    }
  }
}

export interface GoabIconButtonProps extends Margins {
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
  icon,
  disabled,
  variant = "color",
  onClick,
  size = "medium",
  title,
  ariaLabel,
  testId,
  children,
  mt,
  mr,
  mb,
  ml,
  action,
  actionArgs,
  actionArg,
}: GoabIconButtonProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (!onClick) {
      return;
    }
    const current = ref.current;
    const listener = () => {
      onClick();
    };

    current.addEventListener("_click", listener);
    return () => {
      current.removeEventListener("_click", listener);
    };
  }, [ref, onClick]);

  return (
    <goa-icon-button
      ref={ref}
      icon={icon}
      disabled={disabled ? "true" : undefined}
      variant={variant}
      size={size}
      title={title}
      arialabel={ariaLabel}
      action={action}
      action-arg={actionArg}
      action-args={JSON.stringify(actionArgs)}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
    >
      {children}
    </goa-icon-button>
  );
}
