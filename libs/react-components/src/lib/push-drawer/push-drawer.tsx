import { ReactNode, useEffect, useRef } from "react";

interface WCProps {
  open?: boolean;
  testid?: string;
  heading?: string;
  width?: string;
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
  testid?: string;
  open?: boolean;
  heading?: string;
  width?: string;
  actions?: ReactNode | undefined;
  children: ReactNode;
  onClose: () => void;
}

export function GoabPushDrawer({
  testid,
  open,
  heading,
  width,
  actions,
  children,
  onClose,
}: GoabPushDrawerProps) {
  // console.log("GoabPushDrawer:", testId, open, heading);
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    const elCurrent = el?.current;
    if (!elCurrent || !onClose) {
      return;
    }
    elCurrent.addEventListener("_close", onClose);
    return () => {
      elCurrent.removeEventListener("_close", onClose);
    };
  }, [el, onClose]);

  return (
    <goa-push-drawer
      ref={el}
      testid={testid}
      open={open ? true : undefined}
      heading={typeof heading === "string" ? heading : undefined}
      width={width}
    >
      {heading && typeof heading !== "string" && <div slot="heading">{heading}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-push-drawer>
  );
}

export default GoabPushDrawer;
