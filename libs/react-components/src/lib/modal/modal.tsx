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

export interface GoabModalProps {
  heading?: ReactNode;
  maxWidth?: string;
  actions?: ReactElement<any>;
  onClose?: () => void;
  transition?: GoabModalTransition;
  children?: ReactNode;
  open?: boolean;
  calloutVariant?: GoabModalCalloutVariant;
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
      version={"2"}
    >
      {heading && typeof heading !== "string" && <div slot="heading">{heading}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-modal>
  );
}

export default GoabModal;
