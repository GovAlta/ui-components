import { ReactNode } from "react";
import { Margins, DataAttributes } from "@abgov/ui-components-common";
import { transformProps, kebab } from "../common/extract-props";

interface WCProps extends Margins {
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

interface GoabPublicSubformIndexProps extends Margins, DataAttributes {
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
  ...rest
}: GoabPublicSubformIndexProps) {
  const _props = transformProps<WCProps>(
    {
      heading,
      "section-title": sectionTitle,
      "action-button-text": actionButtonText,
      "button-visibility": buttonVisibility,
      ...rest,
    },
    kebab,
  );

  return (
    <goa-public-subform-index slot="subform-index" {..._props}>
      {children}
    </goa-public-subform-index>
  );
}

export default GoabPublicSubformIndex;
