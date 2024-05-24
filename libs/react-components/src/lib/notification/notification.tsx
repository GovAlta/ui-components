import { ABGovAriaLiveType, ABGovNotificationType } from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

interface WCProps {
  ref: React.RefObject<HTMLElement>;
  type: ABGovNotificationType;
  maxcontentwidth?: string;
  arialive?: ABGovAriaLiveType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-notification": WCProps & React.HTMLAttributes<HTMLButtonElement>;
    }
  }
}

export interface ABGovNotificationProps {
  type?: ABGovNotificationType;
  ariaLive?: ABGovAriaLiveType;
  maxContentWidth?: string;
  children?: React.ReactNode;
  onDismiss?: () => void;
  testId?: string;
}

export const ABGovNotification = ({
  type = "information",
  ariaLive,
  maxContentWidth,
  children,
  testId,
  onDismiss,
}: ABGovNotificationProps) => {
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
      data-testid={testId}
      maxcontentwidth={maxContentWidth}
      arialive={ariaLive}
    >
      {children}
    </goa-notification>
  );
}

export default ABGovNotification;
