import { ReactNode, useEffect, useRef, type JSX } from "react";
import { GoabDrawerPosition, GoabDrawerSize } from "@abgov/ui-components-common";

interface WCProps {
  position: GoabDrawerPosition;
  open?: boolean;
  heading?: string;
  maxsize?: GoabDrawerSize;
  testid?: string;
  ref: React.RefObject<HTMLElement | null>;
  version?: string;
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
  /** @required The position of the drawer. */
  position: GoabDrawerPosition;
  /** @required Content rendered inside the drawer body. */
  children: ReactNode;
  /** @required Callback fired when the drawer requests to be closed. */
  onClose: () => void;
  /** Whether the drawer is open. */
  open?: boolean;
  /** The heading text displayed at the top of the drawer. Accepts a string or a ReactNode for custom heading content. */
  heading?: string | ReactNode;
  /** Sets max height on bottom position, sets width on left and right position. */
  maxSize?: GoabDrawerSize;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Action elements rendered in the drawer footer slot. */
  actions?: ReactNode;
}

/** A panel that slides in from the side of the screen to display additional content or actions without navigating away from the current view. */
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
      open={open ? true : undefined}
      heading={typeof heading === "string" ? heading : undefined}
      maxsize={maxSize}
      testid={testId}
      version="2"
    >
      {heading && typeof heading !== "string" && <div slot="heading">{heading}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-drawer>
  );
}

export default GoabDrawer;
