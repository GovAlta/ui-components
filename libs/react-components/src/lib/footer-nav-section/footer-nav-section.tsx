import { ReactNode } from "react";
import { DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps {
  maxcolumncount?: number;
  heading?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer-nav-section": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabFooterNavSectionProps extends DataGridProps {
  maxColumnCount?: number;
  heading?: string;
  testId?: string;
  children?: ReactNode;
}

export function GoabAppFooterNavSection(props: GoabFooterNavSectionProps) {
  const _props = extractProps<WCProps>(props, {
    attributeMapping: "lowercase",
  });

  return (
    <goa-app-footer-nav-section slot="nav" {..._props}>
      {props.children}
    </goa-app-footer-nav-section>
  );
}

export default GoabAppFooterNavSection;
