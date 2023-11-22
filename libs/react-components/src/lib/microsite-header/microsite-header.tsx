declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-microsite-header": WebComponentProps &
      React.HTMLAttributes<HTMLElement>;
    }
  }
}

export type GoAServiceLevel = "alpha" | "beta" | "live";
export type GoALinkTarget = "self" | "blank";

// leagcy type name
export type ServiceLevel = GoAServiceLevel;

interface WebComponentProps {
  type: GoAServiceLevel;
  version?: string;
  feedbackurl?: string;
  maxcontentwidth?: string;
  feedbackurltarget?: GoALinkTarget
  headerurltarget?: GoALinkTarget;
}

export interface HeaderProps {
  type: GoAServiceLevel;
  version?: string;
  feedbackUrl?: string;
  testId?: string;
  maxContentWidth?: string;
  feedbackUrlTarget?: GoALinkTarget;
  headerUrlTarget?: GoALinkTarget;
}

export function GoAMicrositeHeader({
  type,
  version,
  feedbackUrl,
  maxContentWidth,
  feedbackUrlTarget,
  headerUrlTarget,
  testId,
}: HeaderProps): JSX.Element {
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
};

export default GoAMicrositeHeader;
