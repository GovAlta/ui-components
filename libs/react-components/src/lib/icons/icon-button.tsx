import React, { FC, useEffect, useRef } from "react";
import { IconSize, GoAIconType } from "./icon";

type IconVariant = "color" | "nocolor";

interface WCProps {
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

interface Props {
  icon: GoAIconType;
  size?: IconSize;
  variant?: IconVariant;
  title?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const GoAIconButton: FC<Props> = ({
  icon,
  disabled,
  variant = "color",
  onClick,
  size = "medium",
  title,
  children,
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
    const listener = (e: any) => {
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
    >
      {children}
    </goa-icon-button>
  );
};
