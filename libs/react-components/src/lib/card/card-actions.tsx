import type { JSX } from "react";
import { DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-actions": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardActionsProps extends DataGridProps {
  children?: React.ReactNode;
}

export function GoabCardActions(props: GoabCardActionsProps): JSX.Element {
  const _props = extractProps(props, {
    attributeMapping: "lowercase",
  });

  return <goa-card-actions {..._props}>{props.children}</goa-card-actions>;
}

export default GoabCardActions;
