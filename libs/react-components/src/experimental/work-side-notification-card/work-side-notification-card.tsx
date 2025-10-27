import { ReactNode, useEffect, useRef, type JSX } from "react";

interface WCProps {
  id: string;
  type?: string;
  timestamp?: string;
  title?: string;
  description?: string;
  maxwidth?: string;
  ref: React.RefObject<HTMLElement | null>;
}
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-work-side-notification-card": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export type WorkSideNotificationType =
  | "default"
  | "success"
  | "critical"
  | "warning"
  | "info";

/* eslint-disable-next-line */
export interface GoabWorkSideNotificationCardProps {
  id: string;
  type?: WorkSideNotificationType;
  timestamp?: string | Date;
  title?: string;
  description?: string;
  maxWidth?: string;
  onClick?: (id: string) => void;
  badge?: ReactNode;
}

export function GoaxWorkSideNotificationCard({
  id,
  type = "default",
  timestamp,
  title,
  description,
  onClick,
  badge,
  maxWidth,
}: GoabWorkSideNotificationCardProps): JSX.Element {
  const el = useRef<HTMLElement>(null);
  const timestampString = timestamp instanceof Date ? timestamp.toISOString() : timestamp;

  useEffect(() => {
    if (!el?.current || !onClick) {
      return;
    }
    const handleClick = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      onClick(customEvent.detail);
    }
    el.current?.addEventListener("_click", handleClick);
    return () => {
      el.current?.removeEventListener("_click", handleClick);
    };
  }, [el, onClick]);

  return (
    <goa-work-side-notification-card
      ref={el}
      id={id}
      type={type}
      timestamp={timestampString}
      title={title}
      description={description}
      maxwidth={maxWidth}
    >
      {badge && <div slot="badge">{badge}</div>}
    </goa-work-side-notification-card>
  );
}

export default GoaxWorkSideNotificationCard;
