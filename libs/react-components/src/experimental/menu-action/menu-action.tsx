import { DataAttributes, GoabIconType } from "@abgov/ui-components-common";
import type { JSX } from "react";
import { transformProps, lowercase } from "../../lib/common/extract-props";

interface WCProps {
  text: string;
  action: string;
  icon?: GoabIconType;
  testid?: string;
}

export interface GoabxMenuActionProps extends DataAttributes {
  text: string;
  action: string;
  icon?: GoabIconType;
  testId?: string;
}

export function GoabxMenuAction(props: GoabxMenuActionProps): JSX.Element {
  const _props = transformProps<WCProps>(props, lowercase);

  return <goa-menu-action {..._props}></goa-menu-action>;
}

export default GoabxMenuAction;
