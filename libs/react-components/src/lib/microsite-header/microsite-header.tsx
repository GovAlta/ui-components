import { GoabLinkTarget, GoabServiceLevel } from "@abgov/ui-components-common";

import { useEffect, useRef, type JSX } from "react";

declare module "react" {
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
  hasfeedbackhandler?: string;
  ref: React.RefObject<HTMLElement | null>;
  testid?: string;
}

export interface GoabHeaderProps {
  /** @required The service type which determines the badge style. "live" shows official government site text, "alpha" and "beta" show development stage badges. */
  type: GoabServiceLevel;
  /** App or service version displayed on the right side of the header. Accepts a string or custom ReactNode for rich content. */
  version?: string | React.ReactNode;
  /** URL to a feedback page displayed when provided. */
  feedbackUrl?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Maximum width of the content area. @default "100%" */
  maxContentWidth?: string;
  /** Sets the target attribute for the feedback URL link. @default "blank" */
  feedbackUrlTarget?: GoabLinkTarget;
  /** Sets the target attribute for the header link. @default "blank" */
  headerUrlTarget?: GoabLinkTarget;
  /** Callback fired when the feedback link is clicked, enables custom feedback handling. */
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
      hasfeedbackhandler={onFeedbackClick ? "true" : "false"}
    >
      {version && typeof version !== "string" && <div slot="version">{version}</div>}
    </goa-microsite-header>
  );
}

export default GoabMicrositeHeader;
