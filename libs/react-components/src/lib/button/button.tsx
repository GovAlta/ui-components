import { ReactNode, useEffect, useRef } from "react";
import {
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
  Margins,
} from "@abgov/ui-components-common";

interface WCProps extends Margins {
  type?: GoabButtonType;
  size?: GoabButtonSize;
  variant?: GoabButtonVariant;
  disabled?: boolean;
  leadingicon?: string;
  trailingicon?: string;
  width?: string;
  testid?: string;
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

export interface GoabButtonProps extends Margins {
  type?: GoabButtonType;
  size?: GoabButtonSize;
  variant?: GoabButtonVariant;
  disabled?: boolean;
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  width?: string;
  onClick?: () => void;
  testId?: string;
  children?: ReactNode;
}

export function GoabButton({
  disabled = false,
  type = "primary",
  size,
  variant,
  leadingIcon,
  trailingIcon,
  width,
  testId,
  children,
  onClick,
  mt,
  mr,
  mb,
  ml,
}: GoabButtonProps): JSX.Element {

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
      width={width}
      testid={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-button>
  );
}

export default GoabButton;
