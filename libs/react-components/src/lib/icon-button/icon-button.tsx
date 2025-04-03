import {
  GoabIconButtonVariant,
  GoabIconSize,
  GoabIconType,
  Margins,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { toOptionalBooleanAsString } from "../../utils";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
  icon: GoabIconType;
  size?: GoabIconSize;
  variant?: GoabIconButtonVariant;
  title?: string;
  disabled?: string;
  arialabel?: string;
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
  children?: React.ReactNode;
  onClick?: () => void;
  testId?: string;
  ariaLabel?: string;
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
      disabled={toOptionalBooleanAsString(disabled, { omitIfFalse: true })}
      variant={variant}
      size={size}
      title={title}
      arialabel={ariaLabel}
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
