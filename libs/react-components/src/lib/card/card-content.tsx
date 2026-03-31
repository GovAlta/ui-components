import type { JSX } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-content": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardContentProps extends DataAttributes {
  /** Content rendered inside the card content area. */
  children?: React.ReactNode;
}

export function GoabCardContent({
  children,
  ...rest
}: GoabCardContentProps): JSX.Element {
  const _props = transformProps(rest, lowercase);

  return <goa-card-content {..._props}>{children}</goa-card-content>;
}

export default GoabCardContent;
