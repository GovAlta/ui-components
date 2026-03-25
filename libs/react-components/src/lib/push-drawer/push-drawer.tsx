import { ReactNode, useEffect, useRef } from "react";

export interface GoabPushDrawerProps {
  testid?: string;
  open?: boolean;
  heading?: string;
  width?: string;
  /** TO REVIEW: Action buttons or elements displayed in the component's action area. */
  actions?: ReactNode | undefined;
  /**
   * TO REVIEW: The content rendered inside the push drawer body.
   * @required
   */
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
