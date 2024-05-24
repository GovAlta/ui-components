import { ReactNode, useEffect, useRef } from "react";
import { ABGovButtonSize, ABGovButtonType, ABGovButtonVariant, ABGovIconType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  type?: ABGovButtonType;
  size?: ABGovButtonSize;
  variant?: ABGovButtonVariant;
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

export interface ABGovButtonProps extends Margins {
  type?: ABGovButtonType;
  size?: ABGovButtonSize;
  variant?: ABGovButtonVariant;
  disabled?: boolean;
  leadingIcon?: ABGovIconType;
  trailingIcon?: ABGovIconType;
  onClick?: () => void;
  testId?: string;
  children?: ReactNode;
}

export function ABGovButton({
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
}: ABGovButtonProps): JSX.Element {
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

export default ABGovButton;
