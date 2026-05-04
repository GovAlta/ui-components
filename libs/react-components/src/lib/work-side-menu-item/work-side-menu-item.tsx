import { type JSX } from "react";
import { GoabWorkSideMenuItemType } from "@abgov/ui-components-common";
interface WCProps {
  label: string;
  url?: string;
  badge?: string;
  current?: string;
  divider?: string;
  icon?: string;
  testid?: string;
  type?: GoabWorkSideMenuItemType;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-work-side-menu-item": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabWorkSideMenuItemProps {
  /** @required The text label displayed for the menu item. */
  label: string;
  /** The URL the menu item links to. When absent, renders as a button instead of a link. */
  url?: string;
  /** Badge text displayed alongside the menu item (e.g., notification count). */
  badge?: string;
  /** When true, indicates this is the currently active menu item. */
  current?: boolean;
  /** When true, displays a divider line above this menu item. */
  divider?: boolean;
  /** Icon displayed before the menu item label. */
  icon?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Sets the visual style of the badge. Use "emergency" for urgent items, "success" for positive status. @default "normal" */
  type?: GoabWorkSideMenuItemType;
  /** Content rendered inside the menu item. */
  children?: React.ReactNode;
  /** Content rendered inside the popover panel attached to this menu item. */
  popoverContent?: React.ReactNode;
}

/** Individual menu item within the work side menu. */
export function GoabWorkSideMenuItem(props: GoabWorkSideMenuItemProps): JSX.Element {
  return (
    <goa-work-side-menu-item
      label={props.label}
      url={props.url}
      badge={props.badge}
      current={props.current ? "true" : undefined}
      divider={props.divider ? "true" : undefined}
      icon={props.icon}
      testid={props.testId}
      type={props.type}
    >
      {props.popoverContent && <div slot="popoverContent">{props.popoverContent}</div>}
      {props.children}
    </goa-work-side-menu-item>
  );
}

export default GoabWorkSideMenuItem;
