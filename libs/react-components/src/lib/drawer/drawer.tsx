import { ReactNode, useEffect, useRef } from "react";

type DrawerPosition = "bottom" | "left" | "right" | undefined;
type DrawerSizeUnit = "px" | "rem" | "ch" | "vh" | "vw";
type DrawerSize = `${number}${DrawerSizeUnit}` | undefined;

interface WCProps {
  open: boolean | undefined;
  position: DrawerPosition;
  heading?: string;
  maxsize?: DrawerSize;
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

export interface GoADrawerProps {
  open: boolean;
  position: DrawerPosition;
  heading?: string;
  maxSize?: DrawerSize;
  testId?: string;
  children: ReactNode;
  onClose: () => void;
}

export function GoADrawer({
  open,
  position,
  heading,
  maxSize,
  testId,
  children,
  onClose,
}: GoADrawerProps): JSX.Element {
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
      heading={heading}
      maxsize={maxSize}
      data-testid={testId}
    >
      {children}
    </goa-drawer>
  );
}

export default GoADrawer;
