import { useEffect, useRef, type JSX } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../../lib/common/extract-props";

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

export interface GoabxAppHeaderProps extends DataAttributes {
  /**
   * Set the service name to display in the app header.
   * @default ""
   */
  heading?: string;
  /**
   * V2 only: Secondary text displayed under the service name.
   * @default ""
   */
  secondaryText?: string;
  /**
   * Set the URL to link from the alberta.ca logo. A full url is required.
   * @default ""
   */
  url?: string;
  /**
   * Maximum width of the content area.
   * @default ""
   */
  maxContentWidth?: string;
  /**
   * Sets the breakpoint in px for the full menu to display.
   * @default TABLET_BP
   */
  fullMenuBreakpoint?: number;
  /** TO DO: Write a description */
  children?: React.ReactNode;
  onMenuClick?: () => void;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
}

export function GoabxAppHeader({
  onMenuClick,
  children,
  secondaryText,
  ...rest
}: GoabxAppHeaderProps): JSX.Element {
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
