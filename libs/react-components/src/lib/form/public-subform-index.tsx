import { ReactNode, useRef } from "react";
import { Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  ref?: React.RefObject<HTMLElement | null>;
  heading?: string;
  "section-title"?: string;
  "action-button-text"?: string;
  "button-visibility"?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-subform-index": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoabPublicSubformIndexProps extends Margins {
  heading?: string;
  sectionTitle?: string;
  actionButtonText?: string;
  buttonVisibility?: "visible" | "hidden";
  children: ReactNode;
}

export function GoabPublicSubformIndex({
  heading = "",
  sectionTitle = "",
  actionButtonText = "",
  buttonVisibility = "hidden",
  children,
  mt,
  mr,
  mb,
  ml,
}: GoabPublicSubformIndexProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <goa-public-subform-index
      ref={ref}
      heading={heading}
      section-title={sectionTitle}
      action-button-text={actionButtonText}
      button-visibility={buttonVisibility}
      slot="subform-index"
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-public-subform-index>
  );
}

export default GoabPublicSubformIndex;
