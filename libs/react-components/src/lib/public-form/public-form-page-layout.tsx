import { ReactNode, type JSX } from "react";

interface WCProps {
  contentwidth?: string;
  headerwidth?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form-page-layout": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabPublicFormPageLayoutProps {
  /** Full-width header region, e.g. a microsite banner plus the app header. */
  header?: ReactNode;
  /** Full-width footer region. */
  footer?: ReactNode;
  /** Max width of the centered content column, as a CSS length. @default "640px" */
  contentWidth?: string;
  /**
   * Max width applied to a slotted goa-app-header that has not set its own
   * maxContentWidth, so the header lines up with the content. A header with an
   * explicit maxContentWidth always wins. @default "704px"
   */
  headerWidth?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** The page content (the router outlet / form set). */
  children?: ReactNode;
}

/** Page shell for a public form: full-width header/footer, centered content column. */
export function GoabPublicFormPageLayout({
  header,
  footer,
  contentWidth,
  headerWidth,
  testId,
  children,
}: GoabPublicFormPageLayoutProps): JSX.Element {
  return (
    <goa-public-form-page-layout
      contentwidth={contentWidth}
      headerwidth={headerWidth}
      testid={testId}
    >
      {header && <div slot="header">{header}</div>}
      {children}
      {footer && <div slot="footer">{footer}</div>}
    </goa-public-form-page-layout>
  );
}

export default GoabPublicFormPageLayout;