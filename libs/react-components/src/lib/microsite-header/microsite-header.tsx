import { GoabLinkTarget, GoabServiceLevel } from "@abgov/ui-components-common";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-microsite-header": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface WCProps {
  type: GoabServiceLevel;
  version?: string;
  feedbackurl?: string;
  maxcontentwidth?: string;
  feedbackurltarget?: GoabLinkTarget;
  headerurltarget?: GoabLinkTarget;
}

export interface GoabHeaderProps {
  type: GoabServiceLevel;
  version?: string;
  feedbackUrl?: string;
  testId?: string;
  maxContentWidth?: string;
  feedbackUrlTarget?: GoabLinkTarget;
  headerUrlTarget?: GoabLinkTarget;
}

export function GoabMicrositeHeader({
  type,
  version,
  feedbackUrl,
  maxContentWidth,
  feedbackUrlTarget,
  headerUrlTarget,
  testId,
}: GoabHeaderProps): JSX.Element {
  return (
    <goa-microsite-header
      type={type}
      version={version}
      feedbackurl={feedbackUrl}
      data-testid={testId}
      maxcontentwidth={maxContentWidth}
      feedbackurltarget={feedbackUrlTarget}
      headerurltarget={headerUrlTarget}
    />
  );
}

export default GoabMicrositeHeader;
