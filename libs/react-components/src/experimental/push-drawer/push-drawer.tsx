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

export interface GoabxPushDrawerProps {
  open?: boolean;
  /** TO REVIEW: Custom heading content rendered as a template. Use this when the heading requires rich content beyond plain text. */
  heading?: string | ReactNode;
  width?: string;
  testId?: string;
  /** TO REVIEW: Action buttons or elements displayed in the component's action area. */
  actions?: ReactNode;
  /** TO REVIEW: The content rendered inside the push drawer body. */
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
