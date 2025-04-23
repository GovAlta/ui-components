import { ReactNode, useEffect, useRef } from "react";
import { GoabDrawerPosition, GoabDrawerSize } from "../../common/types";

interface WCProps {
  open: boolean | undefined;
  position: GoabDrawerPosition;
  heading?: string;
  maxsize?: GoabDrawerSize;
  testid?: string;
  ref: React.RefObject<HTMLElement>;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-drawer": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabDrawerProps {
  open: boolean;
  position: GoabDrawerPosition;
  heading?: string|ReactNode;
  maxSize?: GoabDrawerSize;
  testId?: string;
  actions?: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

export function GoabDrawer({
  open,
  position,
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
    el.current?.addEventListener("_close", onClose)
    return () => {
      el.current?.removeEventListener("_close", onClose)
    }
  }, [el, onClose])

  return (
    <goa-drawer
      ref={el}
      open={open ? true : undefined}
      position={position}
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
