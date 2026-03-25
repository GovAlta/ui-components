import type { JSX } from "react";
interface WCProps {
  heading: string;
  backgroundurl?: string;
  minheight?: string;
  maxcontentwidth?: string;
  backgroundcolor?: string;
  textcolor?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-hero-banner": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabHeroBannerProps {
  /**
   * Main heading text
   * @required
   */
  heading: string;
  /** Background image url */
  backgroundUrl?: string;
  /** Minimum height of the hero banner. Defaults to 600px when a background image is provided. */
  minHeight?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default "background"
   */
  testId?: string;
  /** TO REVIEW: Content rendered inside the hero banner body. */
  children?: React.ReactNode;
  /**
   * Maximum width of the content area
   * @default "100%"
   */
  maxContentWidth?: string;
  /**
   * Hero Banner background color when no background image is provided
   * @default "#f8f8f8"
   */
  backgroundColor?: string;
  /**
   * Text color within the hero banner.
   * @default ""
   */
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
