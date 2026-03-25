import type { JSX } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-group": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardGroupProps extends DataAttributes {
  /** TO REVIEW: Card elements rendered inside the card group. */
  children?: React.ReactNode;
}

export function GoabCardGroup({
  children,
  ...rest
}: GoabCardGroupProps): JSX.Element {
  const _props = transformProps(rest, lowercase);

  return <goa-card-group {..._props}>{children}</goa-card-group>;
}

export default GoabCardGroup;
