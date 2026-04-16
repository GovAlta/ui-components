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
  /** Set the service name to display in the app header. */
  heading?: string;
  /** V2 only: Secondary text displayed under the service name. */
  secondaryText?: string;
  /** Set the URL to link from the alberta.ca logo. A full url is required. */
  url?: string;
  /** Maximum width of the content area. */
  maxContentWidth?: string;
  /** Sets the breakpoint in px for the full menu to display. */
  fullMenuBreakpoint?: number;
  /** Content rendered inside the app header, typically navigation links. */
  children?: React.ReactNode;
  /** Callback fired when the menu button is clicked. When provided, clicking the menu button dispatches a custom event instead of toggling the menu. */
  onMenuClick?: () => void;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

/** Provide structure to help users find their way around the service. */
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
