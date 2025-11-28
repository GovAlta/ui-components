import { ReactNode, type JSX } from "react";
import { DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps {
  maxcontentwidth?: string;
  testid?: string;
  url?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabAppFooterProps extends DataGridProps {
  maxContentWidth?: string;
  children?: ReactNode;
  testId?: string;
  url?: string;
}

// legacy name
export type FooterProps = GoabAppFooterProps;

export function GoabAppFooter(props: GoabAppFooterProps): JSX.Element {
  const _props = extractProps<WCProps>(props, {
    attributeMapping: "lowercase",
  });

  return (
    <goa-app-footer {..._props}>
      {props.children}
    </goa-app-footer>
  );
}

export default GoabAppFooter;
