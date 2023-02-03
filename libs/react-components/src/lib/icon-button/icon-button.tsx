import React, { FC, useEffect, useRef } from "react";
import { Margins } from "../../common/styling";
import { IconSize, GoAIconType } from "../icon/icon";

type IconVariant = "color" | "nocolor" | "dark";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  icon: GoAIconType;
  size?: IconSize;
  variant?: IconVariant;
  title?: string;
  disabled?: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-icon-button": WCProps & React.HTMLAttributes<HTMLButtonElement>;
    }
  }
}

interface Props extends Margins {
  icon: GoAIconType;
  size?: IconSize;
  variant?: IconVariant;
  title?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  testId?: string;
}

export const GoAIconButton: FC<Props> = ({
  icon,
  disabled,
  variant = "color",
  onClick,
  size = "medium",
  title,
  testId,
  children,
  mt,
  mr,
  mb,
  ml,
}) => {
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
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    >
      {children}
    </goa-icon-button>
  );
};
