interface WCProps {
  heading: string;
  backgroundurl?: string;
  minheight?: string;
  maxcontentwidth?: string;
  backgroundcolor?: string;
  textcolor?: string;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-hero-banner": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabHeroBannerProps {
  heading: string;
  backgroundUrl?: string;
  minHeight?: string;
  testId?: string;
  children?: React.ReactNode;
  maxContentWidth?: string;
  backgroundColor?: string;
  textColor?: string;
}

export function GoabHeroBanner({
  heading,
  backgroundUrl,
  minHeight,
  maxContentWidth,
  backgroundColor,
  textColor,
  children,
  testId,
}: GoabHeroBannerProps): JSX.Element {
  return (
    <goa-hero-banner
      heading={heading}
      backgroundurl={backgroundUrl}
      minheight={minHeight}
      maxcontentwidth={maxContentWidth}
      backgroundcolor={backgroundColor}
      textcolor={textColor}
      testid={testId}
    >
      {children}
    </goa-hero-banner>
  );
}

export default GoabHeroBanner;
