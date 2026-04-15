import type { JSX } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-actions": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardActionsProps extends DataAttributes {
  children?: React.ReactNode;
}

export function GoabCardActions({
  children,
  ...rest
}: GoabCardActionsProps): JSX.Element {
  const _props = transformProps(rest, lowercase);

  return <goa-card-actions {..._props}>{children}</goa-card-actions>;
}

export default GoabCardActions;
