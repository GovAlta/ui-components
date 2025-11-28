import { DataGridProps, GoabIconType } from "@abgov/ui-components-common";
import type { JSX } from "react";
import { extractProps } from "../common/extract-props";

interface WCProps {
  text: string;
  action: string;
  icon?: GoabIconType;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-menu-action": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabMenuActionProps extends DataGridProps {
  text: string;
  action: string;
  icon?: GoabIconType;
  testId?: string;
}

export function GoabMenuAction(props: GoabMenuActionProps): JSX.Element {
  const _props = extractProps<WCProps>(props, {
    attributeMapping: "lowercase",
  });

  return (
    <goa-menu-action {..._props}></goa-menu-action>
  );
}

export default GoabMenuAction;
