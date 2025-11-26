import { ReactNode, useEffect, useRef, type JSX } from "react";
import {
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
  Margins,
} from "@abgov/ui-components-common";
import { DataGridProps, useDataGridProps } from "../common/data-props";

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
  ref: React.RefObject<HTMLElement | null>;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-button": WCProps & React.HTMLAttributes<HTMLElement>;
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
  const [dataGridProps, {
    disabled,
    type,
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
    action,
    actionArgs,
    actionArg,
  }] = useDataGridProps(props);

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
      disabled={disabled ? "true" : undefined}
      leadingicon={leadingIcon}
      trailingicon={trailingIcon}
      width={width}
      testid={testId}
      action={action}
      action-arg={actionArg}
      action-args={JSON.stringify(actionArgs)}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      {...dataGridProps}
    >
      {children}
    </goa-button>
  );
}

export default GoabButton;
