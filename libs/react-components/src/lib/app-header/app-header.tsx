interface WCProps {
  heading?: string;
  url?: string;
  maxcontentwidth?: string;
  fullmenubreakpoint?: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-header": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface ABGovAppHeaderProps {
  heading?: string;
  url?: string;
  maxContentWidth?: string;
  fullMenuBreakpoint?: number;
  children?: React.ReactNode;
  testId?: string;
}

export function ABGovAppHeader({
  heading,
  url,
  maxContentWidth,
  fullMenuBreakpoint,
  testId,
  children,
}: ABGovAppHeaderProps): JSX.Element {
  return (
    <goa-app-header
      heading={heading}
      url={url}
      fullmenubreakpoint={fullMenuBreakpoint}
      maxcontentwidth={maxContentWidth}
      data-testid={testId}
    >
      {children}
    </goa-app-header>
  );
}

export default ABGovAppHeader;
