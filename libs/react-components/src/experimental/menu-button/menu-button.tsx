import {
  DataAttributes,
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
  GoabMenuButtonOnActionDetail,
} from "@abgov/ui-components-common";
import { ReactNode, type JSX, useRef, useEffect } from "react";
import { transformProps, kebab } from "../../lib/common/extract-props";

interface WCProps {
  text?: string;
  type: GoabButtonType;
  size?: GoabButtonSize;
  variant?: GoabButtonVariant;
  "max-width"?: string;
  "leading-icon"?: GoabIconType;
  "aria-label"?: string;
  testid?: string;
  ref: React.RefObject<HTMLElement | null>;
}

export interface GoabxMenuButtonProps extends DataAttributes {
  text?: string;
  type?: GoabButtonType;
  size?: GoabButtonSize;
  variant?: GoabButtonVariant;
  maxWidth?: string;
  leadingIcon?: GoabIconType;
  ariaLabel?: string;
  testId?: string;
  onAction?: (detail: GoabMenuButtonOnActionDetail) => void;
  children?: ReactNode;
}

export function GoabxMenuButton({
  type = "primary",
  testId,
  onAction,
  children,
  ...rest
}: GoabxMenuButtonProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>({ type, testid: testId, ...rest }, kebab);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    if (!onAction) {
      return;
    }
    const current = el.current;

    const listener = (e: Event) => {
      const detail = (e as CustomEvent).detail as GoabMenuButtonOnActionDetail;
      onAction?.(detail);
    };

    current.addEventListener("_action", listener);
    return () => {
      current.removeEventListener("_action", listener);
    };
  }, [el, onAction]);

  return (
    // @ts-expect-error - stable WCProps requires text, but experimental supports icon-only mode
    <goa-menu-button {..._props} version="2" ref={el}>
      {children}
    </goa-menu-button>
  );
}

export default GoabxMenuButton;
