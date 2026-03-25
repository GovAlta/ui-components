import { DataAttributes, GoabButtonSize, GoabButtonType, GoabButtonVariant, GoabIconType, GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";
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
  /**
   * Display text for the menu action.
   * @default ""
   */
  text?: string;
  /**
   * The button style variant.
   * @default "primary"
   */
  type?: GoabButtonType;
  /**
   * Sets the size of the button.
   * @default "normal"
   */
  size?: GoabButtonSize;
  /**
   * Sets the color variant for semantic meaning.
   * @default "normal"
   */
  variant?: GoabButtonVariant;
  /** Maximum width of the dropdown menu. */
  maxWidth?: string;
  /** Icon displayed before the button text. When no text is provided, displays as an icon button. */
  leadingIcon?: GoabIconType;
  /**
   * Sets the aria-label for the icon button in icon-only mode.
   * @default "Open menu"
   */
  ariaLabel?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  onAction?: (detail: GoabMenuButtonOnActionDetail) => void;
  /** TO REVIEW: Menu action items rendered inside the menu button dropdown. */
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

  const _props = transformProps<WCProps>(
    { type, testid: testId, ...rest },
    kebab
  );

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
