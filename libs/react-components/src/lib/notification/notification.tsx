import { GoabAriaLiveType, GoabNotificationType } from "../../common/types";
import { useEffect, useRef } from "react";

interface WCProps {
  ref: React.RefObject<HTMLElement>;
  type: GoabNotificationType;
  maxcontentwidth?: string;
  arialive?: GoabAriaLiveType;
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

export interface GoabNotificationProps {
  type?: GoabNotificationType;
  ariaLive?: GoabAriaLiveType;
  maxContentWidth?: string;
  children?: React.ReactNode;
  onDismiss?: () => void;
  testId?: string;
}

export const GoabNotification = ({
  type = "information",
  ariaLive,
  maxContentWidth,
  children,
  testId,
  onDismiss,
}: GoabNotificationProps) => {
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
};

export default GoabNotification;
