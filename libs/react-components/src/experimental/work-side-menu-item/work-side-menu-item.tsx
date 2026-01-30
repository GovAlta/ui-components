import { useEffect, useRef, type JSX } from "react";
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
      "goa-work-side-menu-item": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
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
  onCLick?: () => void;
}

export function GoabxWorkSideMenuItem({
  label,
  url,
  badge,
  current,
  divider,
  icon,
  testId,
  type,
  children,
  onClick,
}: GoabWorkSideMenuItemProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;
    if (!onClick) return;
    const current = el.current;
    const listener = () => {
      onClick?.();
    };

    current.addEventListener("_click", listener);
    return () => {
      current.removeEventListener("_click", listener);
    };
  }, [el, onClick]);

  return (
    <goa-work-side-menu-item
      ref={el}
      label={label}
      url={url}
      badge={badge}
      current={current ? "true" : undefined}
      divider={divider ? "true" : undefined}
      icon={icon}
      testid={testId}
      type={type}
    >
      {children}
    </goa-work-side-menu-item>
  );
}

export default GoabxWorkSideMenuItem;
