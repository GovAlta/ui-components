import { ReactNode, useEffect, useRef, type JSX } from "react";

interface WCProps {
  heading: string;
  url: string;
  "user-name": string;
  "user-secondary-text": string;
  testid?: string;
  primaryContent?: ReactNode;
  secondaryContent?: ReactNode;
  accountContent?: ReactNode;
  open?: string;
  ref: React.RefObject<HTMLElement | null>;
}
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-work-side-menu": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabWorkSideMenuProps {
  heading: string;
  url: string;
  userName: string;
  userSecondaryText: string;
  testId?: string;
  primaryContent?: ReactNode;
  secondaryContent?: ReactNode;
  accountContent?: ReactNode;
  open?: boolean;
  onToggle?: () => void;
}

export function GoaxWorkSideMenu({
  heading,
  url,
  userName,
  userSecondaryText,
  testId,
  primaryContent,
  secondaryContent,
  accountContent,
  open,
  onToggle,
}: GoabWorkSideMenuProps): JSX.Element {
  const el = useRef<HTMLElement>(null);
  console.log("[React wrapper] open prop is:", open, "type:", typeof open);

  useEffect(() => {
    if (!el?.current || !onToggle) {
      return;
    }
    el.current?.addEventListener("work-side-menu:toggle", onToggle);
    return () => {
      el.current?.removeEventListener("work-side-menu:toggle", onToggle);
    };
  }, [el, onToggle]);
  return (
    <goa-work-side-menu
      ref={el}
      heading={heading}
      url={url}
      user-name={userName}
      user-secondary-text={userSecondaryText}
      open={open ? "true" : "false"}
      testid={testId}
    >
      {primaryContent && <div slot="primary">{primaryContent}</div>}
      {secondaryContent && <div slot="secondary">{secondaryContent}</div>}
      {accountContent && <div slot="account">{accountContent}</div>}
    </goa-work-side-menu>
  );
}

export default GoaxWorkSideMenu;
