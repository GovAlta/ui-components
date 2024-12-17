type WorkSideMenuItemVariation = "normal" | "submenu";
type WorkSideMenuItemType = "normal" | "emergency" | "success";


interface WCProps {
  label: string;
  url: string;
  badge?: string;
  current?: boolean;
  divider?: boolean;
  icon?: string;
  testid?: string;
  type?: WorkSideMenuItemType;
  variation?: WorkSideMenuItemVariation;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-work-side-menu-item": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoAWorkSideMenuItemProps {
  label: string;
  url: string;
  badge?: string;
  current?: boolean;
  divider?: boolean;
  icon?: string;
  testId?: string;
  type?: WorkSideMenuItemType;
  variation?: WorkSideMenuItemVariation;
  children?: React.ReactNode;
}

export function GoAWorkSideMenuItem(props: GoAWorkSideMenuItemProps): JSX.Element {
  return <goa-work-side-menu-item
            label={props.label}
            url={props.url}
            badge={props.badge}
            current={props.current}
            divider={props.divider}
            icon={props.icon}
            testid={props.testId}
            type={props.type}
            variation={props.variation}
            >{props.children}</goa-work-side-menu-item>;
}

export default GoAWorkSideMenuItem;
