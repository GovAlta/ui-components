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

export interface GoABAppHeaderProps {
  heading?: string;
  url?: string;
  maxContentWidth?: string;
  fullMenuBreakpoint?: number;
  children?: React.ReactNode;
  testId?: string;
}

export function GoABAppHeader({
  heading,
  url,
  maxContentWidth,
  fullMenuBreakpoint,
  testId,
  children,
}: GoABAppHeaderProps): JSX.Element {
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

export default GoABAppHeader;
