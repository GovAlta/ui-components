import { DataAttributes, GoabIconType } from "@abgov/ui-components-common";
import type { JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

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

export interface GoabMenuActionProps extends DataAttributes {
  /** @required Display text for the menu action. */
  text: string;
  /** @required Action identifier included in the click event. */
  action: string;
  /** Icon displayed before the text. */
  icon?: GoabIconType;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

/** Individual action item within a menu button. */
export function GoabMenuAction(props: GoabMenuActionProps): JSX.Element {
  const _props = transformProps<WCProps>(props, lowercase);

  return <goa-menu-action {..._props}></goa-menu-action>;
}

export default GoabMenuAction;
