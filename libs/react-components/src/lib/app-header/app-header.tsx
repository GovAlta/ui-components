import { useEffect, useRef } from "react";

interface WCProps {
  heading?: string;
  url?: string;
  maxcontentwidth?: string;
  fullmenubreakpoint?: number;
  hasmobileclickhandler?: boolean;
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

export interface GoAAppHeaderProps {
  heading?: string;
  url?: string;
  maxContentWidth?: string;
  fullMenuBreakpoint?: number;
  children?: React.ReactNode;
  onMobileMenuClick?: () => void;
  testId?: string;
}

export function GoAAppHeader({
  heading,
  url,
  maxContentWidth,
  fullMenuBreakpoint,
  testId,
  children,
  onMobileMenuClick,
}: GoAAppHeaderProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    if (!onMobileMenuClick) {
      return;
    }
    const current = el.current;
    const listener = () => {
      onMobileMenuClick();
    }
    current.addEventListener("_mobileMenuClick", listener);
    return () => {
      current.removeEventListener("_mobileMenuClick", listener);
    }
  }, [el, onMobileMenuClick]);

  return (
    <goa-app-header
      ref={el}
      heading={heading}
      url={url}
      fullmenubreakpoint={fullMenuBreakpoint}
      maxcontentwidth={maxContentWidth}
      testid={testId}
      hasmobileclickhandler={!!onMobileMenuClick}
    >
      {children}
    </goa-app-header>
  );
}

export default GoAAppHeader;
