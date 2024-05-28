import { ReactNode, useEffect, useRef } from "react";
import {
  GoABButtonSize,
  GoABButtonType,
  GoABButtonVariant,
  GoABIconType,
  Margins,
} from "@abgov/ui-components-common";

interface WCProps extends Margins {
  type?: GoABButtonType;
  size?: GoABButtonSize;
  variant?: GoABButtonVariant;
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

export interface GoABButtonProps extends Margins {
  type?: GoABButtonType;
  size?: GoABButtonSize;
  variant?: GoABButtonVariant;
  disabled?: boolean;
  leadingIcon?: GoABIconType;
  trailingIcon?: GoABIconType;
  onClick?: () => void;
  testId?: string;
  children?: ReactNode;
}

export function GoABButton({
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
}: GoABButtonProps): JSX.Element {
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
}

export default GoABButton;
