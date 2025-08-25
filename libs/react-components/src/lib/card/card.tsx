import { DataAttributes, Margins } from "@abgov/ui-components-common";

import type { JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

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

export interface GoabCardProps extends Margins, DataAttributes {
  elevation?: number;
  width?: string;
  testId?: string;
  children?: React.ReactNode;
}

export function GoabCard({
  children,
  ...rest
}: GoabCardProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-card {..._props}>
      {children}
    </goa-card>
  );
}

export default GoabCard;
