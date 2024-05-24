import { ABGovIconButtonVariant, ABGovIconSize, ABGovIconType, Margins } from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  icon: ABGovIconType;
  size?: ABGovIconSize;
  variant?: ABGovIconButtonVariant;
  title?: string;
  disabled?: boolean;
  arialabel?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-icon-button": WCProps & React.HTMLAttributes<HTMLButtonElement>;
    }
  }
}

export interface ABGovIconButtonProps extends Margins {
  icon: ABGovIconType;
  size?: ABGovIconSize;
  variant?: ABGovIconButtonVariant;
  title?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  testId?: string;
  ariaLabel?: string;
}

export function ABGovIconButton({
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
}: ABGovIconButtonProps): JSX.Element {
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
      disabled={disabled}
      variant={variant}
      size={size}
      title={title}
      arialabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    >
      {children}
    </goa-icon-button>
  );
}
