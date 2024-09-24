import { useEffect, useRef } from "react";

export type GoANotificationType =
  | "important"
  | "information"
  | "event"
  | "emergency";

export type GoAAriaLiveType = "polite" | "assertive" | "off";

export type NotificationType = GoANotificationType;
export type AriaLiveType = GoAAriaLiveType;

interface WCProps {
  ref: React.RefObject<HTMLElement>;
  type: GoANotificationType;
  maxcontentwidth?: string;
  arialive?: GoAAriaLiveType;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-notification": WCProps & React.HTMLAttributes<HTMLButtonElement>;
    }
  }
}

export interface GoANotificationProps {
  type?: GoANotificationType;
  ariaLive?: GoAAriaLiveType;
  maxContentWidth?: string;
  children?: React.ReactNode;
  onDismiss?: () => void;
  testId?: string;
}

export const GoANotification = ({
  type = "information",
  ariaLive,
  maxContentWidth,
  children,
  testId,
  onDismiss,
}: GoANotificationProps) => {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = () => {
      onDismiss?.();
    };

    current.addEventListener("_dismiss", listener);
    return () => {
      current.removeEventListener("_dismiss", listener);
    };
  }, [el, onDismiss]);

  return (
    <goa-notification
      ref={el}
      type={type}
      testid={testId}
      maxcontentwidth={maxContentWidth}
      arialive={ariaLive}
    >
      {children}
    </goa-notification>
  );
}

export default GoANotification;
