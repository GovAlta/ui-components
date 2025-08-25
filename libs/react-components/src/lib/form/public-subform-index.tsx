import { ReactNode, useRef } from "react";
import { Margins } from "@abgov/ui-components-common";
import { DataGridProps, useDataGridProps } from "../common/data-props";

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

interface GoabPublicSubformIndexProps extends Margins, DataGridProps {
  heading?: string;
  sectionTitle?: string;
  actionButtonText?: string;
  buttonVisibility?: "visible" | "hidden";
  children: ReactNode;
}

export function GoabPublicSubformIndex(props: GoabPublicSubformIndexProps) {
  const [dataGridProps, {
    heading = "",
    sectionTitle = "",
    actionButtonText = "",
    buttonVisibility = "hidden",
    children,
    mt,
    mr,
    mb,
    ml,
  }] = useDataGridProps(props);
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
      {...dataGridProps}
    >
      {children}
    </goa-public-subform-index>
  );
}

export default GoabPublicSubformIndex;
