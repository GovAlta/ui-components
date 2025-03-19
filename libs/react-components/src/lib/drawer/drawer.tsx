import { ReactNode, useEffect, useRef, type JSX } from "react";
import { fromOptionalBoolean } from "../../utils";

type DrawerPosition = "bottom" | "left" | "right" | undefined;
type DrawerSizeUnit = "px" | "rem" | "ch" | "vh" | "vw";
type DrawerSize = `${number}${DrawerSizeUnit}` | undefined;

interface WCProps {
  position: DrawerPosition;
  open?: string;
  heading?: string;
  maxsize?: DrawerSize;
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

export interface GoADrawerProps {
  position: DrawerPosition;
  open?: boolean;
  heading?: string;
  maxSize?: DrawerSize;
  testId?: string;
  children: ReactNode;
  onClose: () => void;
}

export function GoADrawer({
  position,
  open,
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
    el.current?.addEventListener("_close", onClose);
    return () => {
      el.current?.removeEventListener("_close", onClose);
    };
  }, [el, onClose]);

  return (
    <goa-drawer
      ref={el}
      position={position}
      open={fromOptionalBoolean(open)}
      heading={heading}
      maxsize={maxSize}
      data-testid={testId}
    >
      {children}
    </goa-drawer>
  );
}

export default GoADrawer;
