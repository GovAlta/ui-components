import { ReactNode, useEffect, useRef, type JSX } from "react";

interface WCProps {
  open?: boolean;
  heading?: string;
  width?: string;
  testid?: string;
  version?: string;
  ref: React.RefObject<HTMLElement | null>;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-push-drawer": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabPushDrawerProps {
  open?: boolean;
  heading?: string | ReactNode;
  width?: string;
  testId?: string;
  actions?: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

export function GoabPushDrawer({
  open,
  heading,
  width,
  testId,
  actions,
  children,
  onClose,
}: GoabPushDrawerProps): JSX.Element {
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
    <goa-push-drawer
      ref={el}
      open={open ? true : undefined}
      heading={typeof heading === "string" ? heading : undefined}
      width={width}
      testid={testId}
      version="2"
    >
      {heading && typeof heading !== "string" && <div slot="heading">{heading}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-push-drawer>
  );
}

export default GoabPushDrawer;
