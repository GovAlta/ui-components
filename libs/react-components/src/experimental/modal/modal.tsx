import {
  GoabModalCalloutVariant,
  GoabModalRole,
  GoabModalTransition,
} from "@abgov/ui-components-common";
import { ReactElement, ReactNode, RefObject, useEffect, useRef, type JSX } from "react";

interface WCProps {
  ref: RefObject<HTMLElement | null>;
  heading?: ReactNode;
  open?: string;
  maxwidth?: string;
  closable: string;
  /**
   * @deprecated The role property is deprecated and will be removed in a future version.
   * The modal will always use role="dialog".
   */
  role?: GoabModalRole;
  transition?: GoabModalTransition;
  calloutvariant?: GoabModalCalloutVariant;
  testid?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-modal": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabxModalProps {
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
  /** TO DO: Write a description */
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
  version?: string;
  /**
   * @deprecated The role property is deprecated and will be removed in a future version.
   * The modal will always use role="dialog".
   */
  role?: GoabModalRole;
}

export function GoabxModal({
  heading,
  children,
  maxWidth,
  open,
  actions,
  transition,
  calloutVariant,
  onClose,
  testId,
  version = "2",
}: GoabxModalProps): JSX.Element {
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
      version={version}
    >
      {heading && typeof heading !== "string" && <div slot="heading">{heading}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-modal>
  );
}

export default GoabxModal;
