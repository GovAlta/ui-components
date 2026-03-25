import { ReactNode, useEffect, useRef, type JSX } from "react";

interface WCProps {
  heading: string;
  url: string;
  "user-name"?: string;
  "user-secondary-text"?: string;
  testid?: string;
  primaryContent?: ReactNode;
  secondaryContent?: ReactNode;
  accountContent?: ReactNode;
  open?: boolean;
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
  /** The application name displayed in the header. */
  heading: string;
  /** URL for the header link. Clicking the logo/heading navigates to this URL. */
  url: string;
  /**
   * User's name displayed in the profile section.
   * @default ""
   */
  userName?: string;
  /**
   * Secondary text displayed below the user's name, such as role or email.
   * @default ""
   */
  userSecondaryText?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /** TO REVIEW: Content rendered in the primary navigation slot of the side menu. */
  primaryContent?: ReactNode;
  /** TO REVIEW: Content rendered in the secondary section slot of the side menu. */
  secondaryContent?: ReactNode;
  /** TO REVIEW: Content rendered in the account section slot of the side menu. */
  accountContent?: ReactNode;
  /**
   * Controls whether the side menu is expanded or collapsed.
   * @default false
   */
  open?: boolean;
  onToggle?: () => void;
  onNavigate?: (path: string) => void;
}

export function GoabxWorkSideMenu({
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
  onNavigate,
}: GoabWorkSideMenuProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el?.current || !onToggle) {
      return;
    }
    el.current?.addEventListener("_toggle", onToggle);
    return () => {
      el.current?.removeEventListener("_toggle", onToggle);
    };
  }, [el, onToggle]);

  useEffect(() => {
    if (!el?.current || !onNavigate) {
      return;
    }
    const handler = (e: Event) => {
      onNavigate((e as CustomEvent).detail.url);
    };
    el.current?.addEventListener("_navigate", handler);
    return () => {
      el.current?.removeEventListener("_navigate", handler);
    };
  }, [el, onNavigate]);

  return (
    <goa-work-side-menu
      ref={el}
      heading={heading}
      url={url}
      user-name={userName}
      user-secondary-text={userSecondaryText}
      open={open ? true : false}
      testid={testId}
    >
      {primaryContent && <div slot="primary">{primaryContent}</div>}
      {secondaryContent && <div slot="secondary">{secondaryContent}</div>}
      {accountContent && <div slot="account">{accountContent}</div>}
    </goa-work-side-menu>
  );
}

export default GoabxWorkSideMenu;
