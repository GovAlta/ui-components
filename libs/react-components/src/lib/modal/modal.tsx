import {
  GoABModalCalloutVariant,
  GoABModalRole,
  GoABModalTransition,
} from "@abgov/ui-components-common";
import { ReactElement, ReactNode, RefObject, useEffect, useRef } from "react";

interface WCProps {
  ref: RefObject<HTMLElement>;
  heading?: ReactNode;
  open?: boolean;
  maxwidth?: string;
  closable?: boolean;
  role?: GoABModalRole;
  transition?: GoABModalTransition;
  calloutvariant?: GoABModalCalloutVariant;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-modal": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABModalProps {
  heading?: ReactNode;
  maxWidth?: string;
  actions?: ReactElement;
  onClose?: () => void;
  transition?: GoABModalTransition;
  children?: ReactNode;
  open?: boolean;
  calloutVariant?: GoABModalCalloutVariant;
  testId?: string;
  role?: GoABModalRole;
}

export function GoABModal({
  heading,
  children,
  maxWidth,
  open,
  actions,
  transition,
  calloutVariant,
  onClose,
  testId,
  role,
}: GoABModalProps): JSX.Element {
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
      open={open}
      closable={!!onClose}
      maxwidth={maxWidth}
      transition={transition}
      calloutvariant={calloutVariant}
      data-testid={testId}
      role={role}
    >
      {heading && <div slot="heading">{heading}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-modal>
  );
}

export default GoABModal;
