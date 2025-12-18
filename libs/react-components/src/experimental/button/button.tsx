import { ReactNode, useEffect, useRef, type JSX } from "react";
import {
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
  Margins,
} from "@abgov/ui-components-common";

export interface GoabxButtonProps extends Margins {
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

export function GoabxButton({
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
}: GoabxButtonProps): JSX.Element {
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
    <div className="v2-experimental-tokens">
      <goa-button
        {...{ version: "2" }}
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
      >
        {children}
      </goa-button>
    </div>
  );
}

export default GoabxButton;
