import { useEffect, useRef, type JSX } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  heading?: string;
  secondarytext?: string;
  url?: string;
  maxcontentwidth?: string;
  fullmenubreakpoint?: number;
  hasmenuclickhandler?: string;
  testid?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-header": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

export interface GoabAppHeaderProps extends DataAttributes {
  heading?: string;
  secondaryText?: string;
  url?: string;
  maxContentWidth?: string;
  fullMenuBreakpoint?: number;
  children?: React.ReactNode;
  onMenuClick?: () => void;
  testId?: string;
}

export function GoabAppHeader({
  onMenuClick,
  children,
  secondaryText,
  ...rest
}: GoabAppHeaderProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    if (!onMenuClick) {
      return;
    }
    const current = el.current;
    const listener = () => {
      onMenuClick?.();
    };
    current.addEventListener("_menuClick", listener);
    return () => {
      current.removeEventListener("_menuClick", listener);
    };
  }, [el, onMenuClick]);

  return (
    <goa-app-header
      ref={el}
      hasmenuclickhandler={onMenuClick ? "true" : "false"}
      secondarytext={secondaryText}
      {..._props}
      version="2"
    >
      {children}
    </goa-app-header>
  );
}
