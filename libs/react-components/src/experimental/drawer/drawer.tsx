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

export interface GoabxDrawerProps {
  /** The position of the drawer. */
  position: GoabDrawerPosition;
  /**
   * Whether the drawer is open.
   * @default false
   */
  open?: boolean;
  /**
   * The heading text displayed at the top of the drawer.
   * @default ""
   */
  heading?: string | ReactNode;
  /** Sets max height on bottom position, sets width on left and right position. */
  maxSize?: GoabDrawerSize;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default "drawer"
   */
  testId?: string;
  /** TO REVIEW: Action buttons or elements displayed in the component's action area. */
  actions?: ReactNode;
  /** TO REVIEW: The content rendered inside the drawer body. */
  children: ReactNode;
  onClose: () => void;
  version?: string;
}

export function GoabxDrawer({
  position,
  open,
  heading,
  maxSize,
  testId,
  actions,
  children,
  onClose,
  version = "2",
}: GoabxDrawerProps): JSX.Element {
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
      version={version}
    >
      {heading && typeof heading !== "string" && <div slot="heading">{heading}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-drawer>
  );
}

export default GoabxDrawer;
