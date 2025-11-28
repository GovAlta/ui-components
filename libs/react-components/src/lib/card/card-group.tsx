import type { JSX } from "react";
import { DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-group": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardGroupProps extends DataGridProps {
  children?: React.ReactNode;
}

export function GoabCardGroup(props: GoabCardGroupProps): JSX.Element {
  const _props = extractProps(props, {
    attributeMapping: "lowercase",
  });

  return <goa-card-group {..._props}>{props.children}</goa-card-group>;
}

export default GoabCardGroup;
