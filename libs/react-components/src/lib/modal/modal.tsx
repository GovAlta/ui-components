import { ReactElement, ReactNode, RefObject, useEffect, useRef } from "react";

export type GoAModalTransition = "fast" | "slow" | "none";
export type GoAModalCalloutVariant =
  | "information"
  | "important"
  | "emergency"
  | "success"
  | "event";
export type GoAModalRole = "dialog" | "alertdialog";

// leagcy type names
export type ModalTransition = GoAModalTransition;
export type CalloutVariant = GoAModalCalloutVariant;

interface WCProps {
  ref: RefObject<HTMLElement>;
  heading?: ReactNode;
  open?: boolean;
  maxwidth?: string;
  closable?: boolean;
  transition?: GoAModalTransition;
  calloutvariant?: GoAModalCalloutVariant;
  role?: GoAModalRole;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-modal": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoAModalProps {
  heading?: ReactNode;
  maxWidth?: string;
  actions?: ReactElement;
  onClose?: () => void;
  transition?: GoAModalTransition;
  children?: ReactNode;
  open?: boolean;
  calloutVariant?: GoAModalCalloutVariant;
  testId?: string;
  role?: GoAModalRole;
  // @deprecated: use maxWidth
  width?: string;
  // @deprecated: use variant
  type?: string;
}

export function GoAModal({
  heading,
  children,
  maxWidth,
  open,
  actions,
  transition,
  type,
  calloutVariant,
  onClose,
  testId,
  role,
  width,
}: GoAModalProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  // @deprecated
  useEffect(() => {
    if (type) {
      console.warn("GoAModal [type] is deprecated.");
    }
  }, [type]);

  // @deprecated
  useEffect(() => {
    // @ts-expected-error: deprecated
    maxWidth = width;
  }, [width]);

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
      open={open}
      closable={!!onClose}
      maxwidth={maxWidth}
      transition={transition}
      calloutvariant={calloutVariant}
      testid={testId}
      role={role}
    >
      {heading && <div slot="heading">{heading}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-modal>
  );
}

export default GoAModal;
