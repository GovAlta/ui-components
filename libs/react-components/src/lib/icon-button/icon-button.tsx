import {
  GoabIconButtonVariant,
  GoabIconSize,
  GoabIconType,
  Margins, DataGridProps,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX, ReactNode } from "react";
import { extractProps } from "../common/extract-props";

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
      "goa-icon-button": WCProps & React.HTMLAttributes<HTMLButtonElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

export interface GoabIconButtonProps extends Margins, DataGridProps {
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
  ...props
}: GoabIconButtonProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(
    { variant, size, ...props },
    {
      exclude: ["disabled", "onClick", "actionArgs", "actionArg"],
      attributeMapping: "lowercase",
    }
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (!props.onClick) {
      return;
    }
    const current = ref.current;
    const listener = () => {
      props.onClick?.();
    };

    current.addEventListener("_click", listener);
    return () => {
      current.removeEventListener("_click", listener);
    };
  }, [ref, props.onClick]);

  return (
    <goa-icon-button
      ref={ref}
      disabled={props.disabled ? "true" : undefined}
      action-arg={props.actionArg}
      action-args={JSON.stringify(props.actionArgs)}
      {..._props}
    >
      {props.children}
    </goa-icon-button>
  );
}
