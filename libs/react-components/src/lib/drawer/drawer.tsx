import { ReactNode, useEffect, useRef, type JSX } from "react";
import { GoabDrawerPosition, GoabDrawerSize } from "@abgov/ui-components-common";
import { toOptionalBoolean } from "../../utils";

interface WCProps {
  position: GoabDrawerPosition;
  open?: boolean;
  heading?: string;
  maxsize?: GoabDrawerSize;
  testid?: string;
  ref: React.RefObject<HTMLElement | null>;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-drawer": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabDrawerProps {
  position: GoabDrawerPosition;
  open?: boolean;
  heading?: string | ReactNode;
  maxSize?: GoabDrawerSize;
  testId?: string;
  actions?: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

export function GoabDrawer({
  position,
  open,
  heading,
  maxSize,
  testId,
  actions,
  children,
  onClose,
}: GoabDrawerProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el?.current || !onClose) {
      return;
    }
    el.current?.addEventListener("_close", onClose);
    return () => {
      el.current?.removeEventListener("_close", onClose);
    };
  }, [el, onClose]);

  return (
    <goa-drawer
      ref={el}
      position={position}
      open={toOptionalBoolean(open)}
      heading={typeof heading === "string" ? heading : undefined}
      maxsize={maxSize}
      testid={testId}
    >
      {heading && typeof heading !== "string" && <div slot="heading">{heading}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-drawer>
  );
}

export default GoabDrawer;
