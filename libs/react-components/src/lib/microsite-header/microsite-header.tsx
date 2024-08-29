declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-microsite-header": WCProps &
      React.HTMLAttributes<HTMLElement>;
    }
  }
}

export type GoAServiceLevel = "alpha" | "beta" | "live";
export type GoALinkTarget = "self" | "blank";

// leagcy type name
export type ServiceLevel = GoAServiceLevel;

interface WCProps {
  type: GoAServiceLevel;
  version?: string;
  feedbackurl?: string;
  maxcontentwidth?: string;
  feedbackurltarget?: GoALinkTarget
  headerurltarget?: GoALinkTarget;
}

export interface GoAHeaderProps {
  type: GoAServiceLevel;
  version?: React.ReactNode;
  feedbackUrl?: string;
  testId?: string;
  maxContentWidth?: string;
  feedbackUrlTarget?: GoALinkTarget;
  headerUrlTarget?: GoALinkTarget;
}

// legacy name
export type HeaderProps = GoAHeaderProps;

export function GoAMicrositeHeader({
  type,
  version,
  feedbackUrl,
  maxContentWidth,
  feedbackUrlTarget,
  headerUrlTarget,
  testId,
}: GoAHeaderProps): JSX.Element {
  return (
    <goa-microsite-header
      type={type}
      version={typeof version === "string" ? version : undefined}
      feedbackurl={feedbackUrl}
      data-testid={testId}
      maxcontentwidth={maxContentWidth}
      feedbackurltarget={feedbackUrlTarget}
      headerurltarget={headerUrlTarget}
    >
      {version && typeof version !== "string" && <div slot="version">{version}</div>}
    </goa-microsite-header>
  );
}

export default GoAMicrositeHeader;
