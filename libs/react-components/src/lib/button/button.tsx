import { ReactNode, useEffect, useRef, type JSX } from "react";
import {
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
  Margins, DataGridProps,
} from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps extends Margins {
  type?: GoabButtonType;
  size?: GoabButtonSize;
  variant?: GoabButtonVariant;
  disabled?: string;
  leadingicon?: string;
  trailingicon?: string;
  width?: string;
  testid?: string;
  action?: string;
  actionArgs?: string;
  actionArg?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-button": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

export interface GoabButtonProps extends Margins, DataGridProps {
  type?: GoabButtonType;
  size?: GoabButtonSize;
  variant?: GoabButtonVariant;
  disabled?: boolean;
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  width?: string;
  onClick?: () => void;
  testId?: string;
  action?: string;
  actionArgs?: Record<string, unknown>;
  actionArg?: string;
  children?: ReactNode;
}

export function GoabButton(props: GoabButtonProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["disabled", "onClick", "actionArgs", "actionArg"],
    attributeMapping: "lowercase",
  });

  useEffect(() => {
    if (!el.current) {
      return;
    }
    if (!props.onClick) {
      return;
    }
    const current = el.current;
    const listener = () => {
      props.onClick?.();
    };

    current.addEventListener("_click", listener);
    return () => {
      current.removeEventListener("_click", listener);
    };
  }, [el, props.onClick]);

  return (
    <goa-button
      ref={el}
      disabled={props.disabled ? "true" : undefined}
      action-arg={props.actionArg}
      action-args={JSON.stringify(props.actionArgs)}
      {..._props}
    >
      {props.children}
    </goa-button>
  );
}

export default GoabButton;
