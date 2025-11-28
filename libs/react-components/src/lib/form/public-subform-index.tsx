import { ReactNode } from "react";
import { Margins, DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

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

interface GoabPublicSubformIndexProps extends Margins, DataGridProps {
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
  ...props
}: GoabPublicSubformIndexProps) {
  const _props = extractProps<WCProps>(
    { heading, sectionTitle, actionButtonText, buttonVisibility, ...props },
    {
      attributeMapping: "kebab",
    }
  );

  return (
    <goa-public-subform-index slot="subform-index" {..._props}>
      {props.children}
    </goa-public-subform-index>
  );
}

export default GoabPublicSubformIndex;
