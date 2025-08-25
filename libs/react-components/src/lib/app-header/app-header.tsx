import { useEffect, useRef, type JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps {
  heading?: string;
  url?: string;
  maxcontentwidth?: string;
  fullmenubreakpoint?: number;
  hasmenuclickhandler?: string;
  ref: React.RefObject<HTMLElement | null>;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-header": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabAppHeaderProps extends DataGridProps {
  heading?: string;
  url?: string;
  maxContentWidth?: string;
  fullMenuBreakpoint?: number;
  children?: React.ReactNode;
  onMenuClick?: () => void;
  testId?: string;
}

export function GoabAppHeader(props: GoabAppHeaderProps): JSX.Element {
  const el = useRef<HTMLElement>(null);
  const [dataGridProps, {
    heading,
    url,
    maxContentWidth,
    fullMenuBreakpoint,
    testId,
    children,
    onMenuClick
  }] = useDataGridProps(props);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    if (!onMenuClick) {
      return;
    }
    const current = el.current;
    const listener = () => {
      onMenuClick();
    };
    current.addEventListener("_menuClick", listener);
    return () => {
      current.removeEventListener("_menuClick", listener);
    };
  }, [el, onMenuClick]);

  return (
    <goa-app-header
      ref={el}
      heading={heading}
      url={url}
      fullmenubreakpoint={fullMenuBreakpoint}
      maxcontentwidth={maxContentWidth}
      testid={testId}
      hasmenuclickhandler={onMenuClick ? "true" : "false"}
      {...dataGridProps}
    >
      {children}
    </goa-app-header>
  );
}

export default GoabAppHeader;
