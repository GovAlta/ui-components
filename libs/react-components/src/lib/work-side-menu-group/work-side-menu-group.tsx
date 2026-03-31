import { type JSX } from "react";
import { GoabIconType } from "@abgov/ui-components-common";

interface WCProps {
  heading: string;
  icon?: GoabIconType;
  testid?: string;
  open?: boolean;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-work-side-menu-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabWorkSideMenuGroupProps {
  /** @required The text displayed in the group heading. */
  heading: string;
  /** Icon displayed before the group label. When omitted, no icon is rendered and no space is reserved. */
  icon?: GoabIconType;
  /** Whether the group is open. */
  open?: boolean;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Content rendered inside the group, typically WorkSideMenuItem components. */
  children?: React.ReactNode;
}

export function GoabWorkSideMenuGroup(props: GoabWorkSideMenuGroupProps): JSX.Element {
  return (
    <goa-work-side-menu-group
      heading={props.heading}
      icon={props.icon}
      open={props.open ? true : undefined}
      testid={props.testId}
    >
      {props.children}
    </goa-work-side-menu-group>
  );
}

export default GoabWorkSideMenuGroup;
