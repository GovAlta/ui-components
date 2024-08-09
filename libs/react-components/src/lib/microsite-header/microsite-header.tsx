import { GoABLinkTarget, GoABServiceLevel } from "@abgov/ui-components-common";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-microsite-header": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface WCProps {
  type: GoABServiceLevel;
  version?: string;
  feedbackurl?: string;
  maxcontentwidth?: string;
  feedbackurltarget?: GoABLinkTarget;
  headerurltarget?: GoABLinkTarget;
}

export interface GoABHeaderProps {
  type: GoABServiceLevel;
  version?: string;
  feedbackUrl?: string;
  testId?: string;
  maxContentWidth?: string;
  feedbackUrlTarget?: GoABLinkTarget;
  headerUrlTarget?: GoABLinkTarget;
}

export function GoABMicrositeHeader({
  type,
  version,
  feedbackUrl,
  maxContentWidth,
  feedbackUrlTarget,
  headerUrlTarget,
  testId,
}: GoABHeaderProps): JSX.Element {
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

export default GoABMicrositeHeader;
