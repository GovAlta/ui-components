import {
  GoabModalCalloutVariant,
  GoabModalRole,
  GoabModalTransition,
} from "@abgov/ui-components-common";
import { ReactElement, ReactNode, RefObject, useEffect, useRef, type JSX } from "react";

export interface GoabModalProps {
  /**
   * The heading text displayed at the top of the modal.
   * @default ""
   */
  heading?: ReactNode;
  /**
   * Set the max allowed width of the modal.
   * @default "60ch"
   */
  maxWidth?: string;
  actions?: ReactElement<any>;
  onClose?: () => void;
  /**
   * Sets the animation transition when opening/closing. 'fast' or 'slow' for animated, 'none' for instant.
   * @default "none"
   */
  transition?: GoabModalTransition;
  children?: ReactNode;
  /**
   * Controls if modal is visible or not.
   * @default false
   */
  open?: boolean;
  /** Define the context and colour of the callout modal. It is required when type is set to callout. */
  calloutVariant?: GoabModalCalloutVariant;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default "modal"
   */
  testId?: string;
  /**
   * @deprecated The role property is deprecated and will be removed in a future version.
   * The modal will always use role="dialog".
   */
  role?: GoabModalRole;
}

export function GoabModal({
  heading,
  children,
  maxWidth,
  open,
  actions,
  transition,
  calloutVariant,
  onClose,
  testId,
}: GoabModalProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = () => {
      onClose?.();
    };

    current.addEventListener("_close", listener);
    return () => {
      current.removeEventListener("_close", listener);
    };
  }, [el, onClose]);

  return (
    <goa-modal
      ref={el}
      open={open ? "true" : undefined}
      closable={onClose ? "true" : "false"}
      heading={typeof heading === "string" ? heading : undefined}
      maxwidth={maxWidth}
      transition={transition}
      calloutvariant={calloutVariant}
      testid={testId}
    >
      {heading && typeof heading !== "string" && <div slot="heading">{heading}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-modal>
  );
}

export default GoabModal;
