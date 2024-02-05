interface WCProps {
  heading?: string;
  url?: string;
  maxcontentwidth?: string;
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
  children?: React.ReactNode;
  testId?: string;
}

export function GoAAppHeader({
  heading,
  url,
  maxContentWidth,
  testId,
  children,
}: GoAAppHeaderProps): JSX.Element {
  return (
    <goa-app-header
      heading={heading}
      url={url}
      maxcontentwidth={maxContentWidth}
      data-testid={testId}
    >
      {children}
    </goa-app-header>
  );
}

export default GoAAppHeader;
