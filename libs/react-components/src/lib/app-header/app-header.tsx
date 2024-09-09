import { useEffect, useRef } from "react";

interface WCProps {
  heading?: string;
  url?: string;
  maxcontentwidth?: string;
  fullmenubreakpoint?: number;
  hasmenuclickhandler?: boolean;
  ref: React.RefObject<HTMLElement>;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-header": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabAppHeaderProps {
  heading?: string;
  url?: string;
  maxContentWidth?: string;
  fullMenuBreakpoint?: number;
  children?: React.ReactNode;
  onMenuClick?: () => void;
  testId?: string;
}

export function GoabAppHeader({
  heading,
  url,
  maxContentWidth,
  fullMenuBreakpoint,
  testId,
  children,
  onMenuClick,
}: GoabAppHeaderProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

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
    }
    current.addEventListener("_menuClick", listener);
    return () => {
      current.removeEventListener("_menuClick", listener);
    }
  }, [el, onMenuClick]);

  return (
    <goa-app-header
      ref={el}
      heading={heading}
      url={url}
      fullmenubreakpoint={fullMenuBreakpoint}
      maxcontentwidth={maxContentWidth}
      testid={testId}
      hasmenuclickhandler={!!onMenuClick}
    >
      {children}
    </goa-app-header>
  );
}

export default GoabAppHeader;
