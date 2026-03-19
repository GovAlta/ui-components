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
  type?: GoabWorkSideNotificationItemType;
  timestamp?: string;
  title?: string;
  description: string;
  readStatus?: GoabWorkSideNotificationReadStatus;
  priority?: GoabWorkSideNotificationPriority;
  testId?: string;
  onClick?: () => void;
}

export function GoabxWorkSideNotificationItem({
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

export default GoabxWorkSideNotificationItem;
