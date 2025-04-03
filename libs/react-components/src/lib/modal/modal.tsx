import {
  GoabModalCalloutVariant,
  GoabModalRole,
  GoabModalTransition,
} from "@abgov/ui-components-common";
import { ReactElement, ReactNode, RefObject, useEffect, useRef, type JSX } from "react";
import { toOptionalBooleanAsString } from "../../utils";

interface WCProps {
  ref: RefObject<HTMLElement | null>;
  heading?: ReactNode;
  open?: string;
  maxwidth?: string;
  closable: string;
  role?: GoabModalRole;
  transition?: GoabModalTransition;
  calloutvariant?: GoabModalCalloutVariant;
  testid?: string;
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
  role,
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
      open={toOptionalBooleanAsString(open)}
      closable={onClose ? "true" : "false"}
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

export default GoabModal;
