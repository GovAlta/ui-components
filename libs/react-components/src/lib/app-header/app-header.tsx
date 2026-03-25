import { useEffect, useRef, type JSX } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  heading?: string;
  url?: string;
  maxcontentwidth?: string;
  fullmenubreakpoint?: number;
  hasmenuclickhandler?: string;
  testid?: string;
}

export interface GoabAppHeaderProps extends DataAttributes {
  /**
   * Set the service name to display in the app header.
   * @default ""
   */
  heading?: string;
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
  /** TO REVIEW: Navigation items, menus, or other elements rendered inside the app header. */
  children?: React.ReactNode;
  onMenuClick?: () => void;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
}

export function GoabAppHeader({
  onMenuClick,
  children,
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
      {..._props}
    >
      {children}
    </goa-app-header>
  );
}

export default GoabAppHeader;
