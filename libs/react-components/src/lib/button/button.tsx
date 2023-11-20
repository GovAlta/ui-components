import React, { FC, ReactNode, useEffect, useRef } from "react";
import { Margins } from "../../common/styling";
import { GoAIconType } from "../icon/icon";

export type GoAButtonType =
  | "primary"
  | "submit"
  | "secondary"
  | "tertiary"
  | "start";

export type GoAButtonSize = "compact" | "normal";
export type GoAButtonVariant = "normal" | "destructive";

// legacy type names
export type ButtonType = GoAButtonType;
export type ButtonSize = GoAButtonSize;
export type ButtonVariant = GoAButtonVariant;

interface WCProps extends Margins {
  type?: GoAButtonType;
  size?: GoAButtonSize;
  variant?: GoAButtonVariant;
  disabled?: boolean;
  leadingicon?: string;
  trailingicon?: string;
  ref: React.RefObject<HTMLElement>;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-button": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface ButtonProps extends Margins {
  type?: GoAButtonType;
  size?: GoAButtonSize;
  variant?: GoAButtonVariant;
  disabled?: boolean;
  leadingIcon?: GoAIconType;
  trailingIcon?: GoAIconType;
  onClick?: () => void;
  testId?: string;
  children?: ReactNode;
}

export const GoAButton: FC<ButtonProps> = ({
  disabled = false,
  type = "primary",
  size,
  variant,
  leadingIcon,
  trailingIcon,
  testId,
  children,
  onClick,
  mt,
  mr,
  mb,
  ml,
}) => {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) {
      return;
    }
    if (!onClick) {
      return;
    }
    const current = el.current;
    const listener = () => {
      onClick();
    };

    current.addEventListener("_click", listener);
    return () => {
      current.removeEventListener("_click", listener);
    };
  }, [el, onClick]);

  return (
    <goa-button
      ref={el}
      type={type}
      size={size}
      variant={variant}
      disabled={disabled}
      leadingicon={leadingIcon}
      trailingicon={trailingIcon}
      data-testid={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-button>
  );
};

export default GoAButton;
