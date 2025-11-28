import { type JSX, useEffect, useRef } from "react";
import { GoabWorkSideMenuItemType } from "@abgov/ui-components-common";

interface WCProps {
  ref: React.RefObject<HTMLElement | null>;
  label: string;
  url?: string;
  badge?: string;
  current?: string;
  divider?: string;
  icon?: string;
  testid?: string;
  type?: GoabWorkSideMenuItemType;
  hasonclickhandler?: string;
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

export function GoabxWorkSideMenuItem(props: GoabWorkSideMenuItemProps): JSX.Element {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current || !props.onClick) {
      return;
    }
    const handleClick = () => {
      props.onClick?.();
    }
    el.current?.addEventListener("_click", handleClick);
    return () => {
      el.current?.removeEventListener("_click", handleClick);
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
      hasonclickhandler={props.onClick ? "true" : "false"}
    >
      {props.children}
      {props.popoverContent && <div slot="popoverContent">{props.popoverContent}</div>}
    </goa-work-side-menu-item>
  );
}

export default GoabxWorkSideMenuItem;
