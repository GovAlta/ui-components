import { useEffect, useRef, type JSX } from "react";
import {
  GoabWorkSideNotificationItemType,
  GoabWorkSideNotificationReadStatus,
  GoabWorkSideNotificationPriority,
} from "@abgov/ui-components-common";

interface WCProps {
  type?: GoabWorkSideNotificationItemType;
  timestamp?: string;
  title?: string;
  description: string;
  "read-status"?: GoabWorkSideNotificationReadStatus;
  priority?: GoabWorkSideNotificationPriority;
  testid?: string;
  ref: React.RefObject<HTMLElement | null>;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-work-side-notification-item": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabWorkSideNotificationItemProps {
  /** @required The body text content of the notification card. */
  description: string;
  /** Sets the visual type/style of the notification item. @default "default" */
  type?: GoabWorkSideNotificationItemType;
  /** ISO timestamp string representing when the notification occurred. */
  timestamp?: string;
  /** Title text displayed in the notification card header. */
  title?: string;
  /** Indicates whether the notification has been read or is unread. @default "unread" */
  readStatus?: GoabWorkSideNotificationReadStatus;
  /** Sets the urgency level of the notification. @default "normal" */
  priority?: GoabWorkSideNotificationPriority;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Callback fired when the notification item is clicked. */
  onClick?: () => void;
}

/** Displays an individual notification item in the work-side notification panel. */
export function GoabWorkSideNotificationItem({
  type,
  timestamp,
  title,
  description,
  readStatus,
  priority,
  testId,
  onClick,
}: GoabWorkSideNotificationItemProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const handleClick = () => {
      onClick?.();
    };

    el.current.addEventListener("_click", handleClick);

    return () => {
      el.current?.removeEventListener("_click", handleClick);
    };
  }, [el, onClick]);

  return (
    <goa-work-side-notification-item
      ref={el}
      type={type}
      timestamp={timestamp}
      title={title}
      description={description}
      read-status={readStatus}
      priority={priority}
      testid={testId}
    />
  );
}

export default GoabWorkSideNotificationItem;
