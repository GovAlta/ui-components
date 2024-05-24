import { ABGovLinkTarget, ABGovServiceLevel } from "@abgov/ui-components-common";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-microsite-header": WCProps &
      React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface WCProps {
  type: ABGovServiceLevel;
  version?: string;
  feedbackurl?: string;
  maxcontentwidth?: string;
  feedbackurltarget?: ABGovLinkTarget
  headerurltarget?: ABGovLinkTarget;
}

export interface ABGovHeaderProps {
  type: ABGovServiceLevel;
  version?: string;
  feedbackUrl?: string;
  testId?: string;
  maxContentWidth?: string;
  feedbackUrlTarget?: ABGovLinkTarget;
  headerUrlTarget?: ABGovLinkTarget;
}

export function ABGovMicrositeHeader({
  type,
  version,
  feedbackUrl,
  maxContentWidth,
  feedbackUrlTarget,
  headerUrlTarget,
  testId,
}: ABGovHeaderProps): JSX.Element {
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

export default ABGovMicrositeHeader;
