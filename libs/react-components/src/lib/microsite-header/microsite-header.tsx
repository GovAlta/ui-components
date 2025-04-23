import { GoabLinkTarget, GoabServiceLevel } from "../../common/types";

import { useEffect, useRef } from "react";

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
  hasfeedbackhandler?: boolean;
  ref: React.RefObject<HTMLElement>;
  testid?: string;
}

export interface GoabHeaderProps {
  type: GoabServiceLevel;
  version?: string | React.ReactNode;
  feedbackUrl?: string;
  testId?: string;
  maxContentWidth?: string;
  feedbackUrlTarget?: GoabLinkTarget;
  headerUrlTarget?: GoabLinkTarget;
  onFeedbackClick?: () => void;
}

export function GoabMicrositeHeader({
  type,
  version,
  feedbackUrl,
  maxContentWidth,
  feedbackUrlTarget,
  headerUrlTarget,
  testId,
  onFeedbackClick,
}: GoabHeaderProps): JSX.Element {
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
      testid={testId}
      maxcontentwidth={maxContentWidth}
      feedbackurltarget={feedbackUrlTarget}
      headerurltarget={headerUrlTarget}
      hasfeedbackhandler={!!onFeedbackClick}
    >
      {version && typeof version !== "string" && <div slot="version">{version}</div>}
    </goa-microsite-header>
  );
}

export default GoabMicrositeHeader;
