/**
 * @module GoabMenuButton
 *
 * This module defines the `GoabMenuButton` React component and related types,
 * which wraps a Web Component (`goa-menu-button`) with enhanced functionality for React applications.
 * It also includes TypeScript interfaces for improved type checking and development experience.
 */

import { GoabButtonType, GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";
import { ReactNode, type JSX, useRef, useEffect } from "react";

/**
 * Props definition for the `goab-menu-button` Web Component.
 * @typedef {Object} WCProps
 *
 * @property {string} text - The text label to be displayed on the button.
 * @property {GoabButtonType} type - The button type, e.g., "primary", "secondary", etc.
 * @property {string} [testid] - A test identifier for automated testing purposes.
 * @property {React.RefObject<HTMLElement | null>} ref - A reference object pointing to the Web Component's DOM element.
 */
interface WCProps {
  text: string;
  type: GoabButtonType;
  testid?: string;
  ref: React.RefObject<HTMLElement | null>;
}

/**
 * Extends React's `JSX` namespace to include the custom `goa-menu-button` Web Component.
 * The `goa-menu-button` supports additional React-specific props.
 */
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-menu-button": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/**
 * Props for the `GoabMenuButton` React component.
 *
 * @typedef {Object} GoabMenuButtonProps
 *
 * @property {string} text - The text label to display on the button.
 * @property {GoabButtonType} [type="primary"] - The button type, e.g., "primary", "secondary". Defaults to "primary".
 * @property {string} [testId] - A test identifier for automated testing purposes.
 * @property {Function} [onAction] - Callback function invoked when an action event is emitted by the component.
 * @property {ReactNode} [children] - Optional child elements to be rendered inside the button.
 */
export interface GoabMenuButtonProps {
  text: string;
  type?: GoabButtonType;
  testId?: string;
  onAction?: (detail: GoabMenuButtonOnActionDetail) => void;
  children?: ReactNode;
}

/**
 * A React wrapper component for the `goa-menu-button` Web Component.
 *
 * This component provides seamless integration of the Web Component into a React application, including React-specific props and event handling.
 *
 * @function GoabMenuButton
 * @param {GoabMenuButtonProps} props - The props for the component.
 *
 * @returns {JSX.Element} A JSX element wrapping the `goa-menu-button` Web Component.
 *
 * @example
 * ```tsx
 * <GoabMenuButton
 *   text="Example Button"
 *   type="secondary"
 *   onAction={(action) => console.log(`Action: ${action}`)}
 * >
 *   <GoabMenuAction text="Option 1" action="option1" />
 *   <GoabMenuAction text="Option 2" action="option2" />
 *   <GoabMenuAction text="Option 3" action="option3" />
 * </GoabMenuButton>
 * ```
 */
export function GoabMenuButton({
  text,
  type = "primary",
  testId,
  onAction,
  children,
}: GoabMenuButtonProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    if (!onAction) {
      return;
    }
    const current = el.current;

    // Event listener for the "_action" event emitted by the Web Component.
    const listener = (e: Event) => {
      const detail = (e as CustomEvent).detail as GoabMenuButtonOnActionDetail;
      onAction(detail);
    };

    current.addEventListener("_action", listener);
    return () => {
      current.removeEventListener("_action", listener);
    };
  }, [el, onAction]);

  return (
    <goa-menu-button ref={el} text={text} type={type} testid={testId}>
      {children}
    </goa-menu-button>
  );
}

export default GoabMenuButton;
