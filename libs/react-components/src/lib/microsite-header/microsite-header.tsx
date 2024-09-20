import { useEffect, useRef } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-microsite-header": WCProps & React.HTMLAttributes<HTMLElement>;
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
  feedbackurltarget?: GoALinkTarget;
  headerurltarget?: GoALinkTarget;
  hasfeedbackhandler?: boolean;
  ref: React.RefObject<HTMLElement>;
}

export interface GoAHeaderProps {
  type: GoAServiceLevel;
  version?: React.ReactNode;
  feedbackUrl?: string;
  testId?: string;
  maxContentWidth?: string;
  feedbackUrlTarget?: GoALinkTarget;
  headerUrlTarget?: GoALinkTarget;
  onFeedbackClick?: () => void;
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
  onFeedbackClick,
}: GoAHeaderProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    if (!onFeedbackClick) {
      return;
    }
    const current = el.current;
    const listener = () => {
      onFeedbackClick();
    };

    current.addEventListener("_feedbackClick", listener);
    return () => {
      current.removeEventListener("_feedbackClick", listener);
    };
  }, [el, onFeedbackClick]);

  return (
    <goa-microsite-header
      ref={el}
      type={type}
      version={typeof version === "string" ? version : undefined}
      feedbackurl={feedbackUrl}
      data-testid={testId}
      maxcontentwidth={maxContentWidth}
      feedbackurltarget={feedbackUrlTarget}
      headerurltarget={headerUrlTarget}
      hasfeedbackhandler={!!onFeedbackClick}
    >
      {version && typeof version !== "string" && <div slot="version">{version}</div>}
    </goa-microsite-header>
  );
}

export default GoAMicrositeHeader;
