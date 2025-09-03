import { type JSX } from "react";
import { GoabWorkSideMenuItemType } from "@abgov/ui-components-common";
interface WCProps {
  label: string;
  url: string;
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

/* eslint-disable-next-line */
export interface GoabWorkSideMenuItemProps {
  label: string;
  url: string;
  badge?: string;
  current?: boolean;
  divider?: boolean;
  icon?: string;
  testId?: string;
  type?: GoabWorkSideMenuItemType;
  children?: React.ReactNode;
}

export function GoaxWorkSideMenuItem(props: GoabWorkSideMenuItemProps): JSX.Element {
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
      {props.children}
    </goa-work-side-menu-item>
  );
}

export default GoaxWorkSideMenuItem;
