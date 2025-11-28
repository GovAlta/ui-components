import { DataGridProps, Margins } from "@abgov/ui-components-common";

import type { JSX } from "react";
import { extractProps } from "../common/extract-props";

interface WCProps extends Margins {
  elevation?: number;
  width?: string;
  children: React.ReactNode;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardProps extends Margins, DataGridProps {
  elevation?: number;
  width?: string;
  testId?: string;
  children?: React.ReactNode;
}

export function GoabCard(props: GoabCardProps): JSX.Element {
  const _props = extractProps<WCProps>(props, {
    attributeMapping: "lowercase",
  });

  return (
    <goa-card {..._props}>
      {props.children}
    </goa-card>
  );
}

export default GoabCard;
