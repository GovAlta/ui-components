import React, { FC, useEffect, useRef } from "react";

export type GoAModalTransition = "fast" | "slow" | "none";
export type GoAModalCalloutVariant =
  | "information"
  | "important"
  | "emergency"
  | "success"
  | "event";

// leagcy type names
export type ModalTransition = GoAModalTransition;
export type CalloutVariant = GoAModalCalloutVariant;

interface WCProps {
  ref: React.RefObject<HTMLElement>;
  heading?: React.ReactNode;
  open?: boolean;
  maxwidth?: string;
  closable?: boolean;
  transition?: GoAModalTransition;
  calloutvariant?: GoAModalCalloutVariant;
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
  heading?: React.ReactNode;
  maxWidth?: string;
  actions?: React.ReactElement;
  onClose?: () => void;
  transition?: GoAModalTransition;
  children?: React.ReactNode;
  open?: boolean;
  calloutVariant?: GoAModalCalloutVariant;
  testId?: string;

  // @deprecated: use maxWidth
  width?: string;
  // @deprecated: use variant
  type?: string;
}

export const GoAModal: FC<GoAModalProps> = ({
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

  width,
}) => {
  const el = useRef<HTMLElement>(null);

  // deprecation
  useEffect(() => {
    if (type) {
      console.warn("GoAModal [type] is deprecated.");
    }
  }, [type]);

  // deprecation
  useEffect(() => {
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
      data-testid={testId}
    >
      {heading && <div slot="heading">{heading}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-modal>
  );
};

export default GoAModal;
