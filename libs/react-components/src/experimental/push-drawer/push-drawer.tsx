import { ReactNode, useEffect, useRef, type JSX } from "react";

export interface GoabxPushDrawerProps {
  open?: boolean;
  heading?: string | ReactNode;
  width?: string;
  testId?: string;
  actions?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  version?: string;
}

export function GoabxPushDrawer({
  open,
  heading,
  width,
  testId,
  actions,
  children,
  onClose,
  version = "2",
}: GoabxPushDrawerProps): JSX.Element {
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
      version={version}
    >
      {heading && typeof heading !== "string" && <div slot="heading">{heading}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-push-drawer>
  );
}

export default GoabxPushDrawer;
