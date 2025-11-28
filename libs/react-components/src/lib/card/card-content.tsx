import type { JSX } from "react";
import { DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-content": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardContentProps extends DataGridProps {
  children?: React.ReactNode;
}

export function GoabCardContent(props: GoabCardContentProps): JSX.Element {
  const _props = extractProps(props, {
    attributeMapping: "lowercase",
  });

  return <goa-card-content {..._props}>{props.children}</goa-card-content>;
}

export default GoabCardContent;
