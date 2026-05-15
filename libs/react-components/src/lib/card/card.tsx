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
  /** Adds a shadow to the card. 0 shows a border, 1-3 increase shadow intensity. */
  elevation?: number;
  /** Sets the width of the card. @default "100%" */
  width?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Content rendered inside the card. */
  children?: React.ReactNode;
}

/** A container that groups related content and actions. */
export function GoabCard({ children, ...rest }: GoabCardProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return <goa-card {..._props}>{children}</goa-card>;
}

export default GoabCard;
