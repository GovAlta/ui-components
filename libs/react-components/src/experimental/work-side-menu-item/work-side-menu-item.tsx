import { type JSX, useEffect, useRef } from "react";
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
  popoverContent?: React.ReactNode;
  ref: React.RefObject<HTMLElement | null>;
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
  url?: string;
  badge?: string;
  current?: boolean;
  divider?: boolean;
  icon?: string;
  testId?: string;
  type?: GoabWorkSideMenuItemType;
  children?: React.ReactNode;
  popoverContent?: React.ReactNode;
  onClick?: () => void;
}

export function GoaxWorkSideMenuItem(props: GoabWorkSideMenuItemProps): JSX.Element {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current || !props.onClick) {
      return;
    }
    const handleClick = () => {
      props.onClick?.();
    }
    el.current?.addEventListener("work-side-menu:update", handleClick);
    return () => {
      el.current?.removeEventListener("work-side-menu:update",  handleClick);
    };
  }, [el, props.onClick]);

  return (
    <goa-work-side-menu-item
      ref={el}
      label={props.label}
      url={props.url ? props.url : "none"}
      badge={props.badge}
      current={props.current ? "true" : undefined}
      divider={props.divider ? "true" : undefined}
      icon={props.icon}
      testid={props.testId}
      type={props.type}
    >
      {props.children}
      {props.popoverContent && <div slot="popoverContent">{props.popoverContent}</div>}
    </goa-work-side-menu-item>
  );
}

export default GoaxWorkSideMenuItem;
