import { ReactNode, useEffect, useRef, type JSX } from "react";
import { GoabWorkSideNotificationActiveTabType } from "@abgov/ui-components-common";

interface WCProps {
  heading?: string;
  "active-tab"?: GoabWorkSideNotificationActiveTabType;
  testid?: string;
  ref: React.RefObject<HTMLElement | null>;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-work-side-notification-panel": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabWorkSideNotificationPanelProps {
  /** Sets the panel heading text. @default "Notifications" */
  heading?: string;
  /** Sets the initially active tab. @default "unread" */
  activeTab?: GoabWorkSideNotificationActiveTabType;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Notification item content rendered inside the panel. */
  children?: ReactNode;
  /** Callback fired when the "Mark all as read" button is clicked. */
  onMarkAllRead?: () => void;
  /** Callback fired when the "View all" button is clicked. */
  onViewAll?: () => void;
}

/** Displays a panel of work-side notifications. */
export function GoabWorkSideNotificationPanel({
  heading,
  activeTab,
  testId,
  children,
  onMarkAllRead,
  onViewAll,
}: GoabWorkSideNotificationPanelProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const handleMarkAllRead = () => {
      onMarkAllRead?.();
    };

    const handleViewAll = () => {
      onViewAll?.();
    };

    el.current.addEventListener("_markAllRead", handleMarkAllRead);
    el.current.addEventListener("_viewAll", handleViewAll);

    return () => {
      el.current?.removeEventListener("_markAllRead", handleMarkAllRead);
      el.current?.removeEventListener("_viewAll", handleViewAll);
    };
  }, [el, onMarkAllRead, onViewAll]);

  return (
    <goa-work-side-notification-panel
      ref={el}
      heading={heading}
      active-tab={activeTab}
      testid={testId}
    >
      {children}
    </goa-work-side-notification-panel>
  );
}

export default GoabWorkSideNotificationPanel;
