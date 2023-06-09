import React, { useEffect, useRef } from "react";

export type NotificationType =
  | "important"
  | "information"
  | "event"
  | "emergency";

export type AriaLiveType = "polite" | "assertive" | "off";

interface WCProps {
  ref: React.RefObject<HTMLElement>;
  type: NotificationType;
  maxcontentwidth?: string;
  arialive?: AriaLiveType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-notification": WCProps & React.HTMLAttributes<HTMLButtonElement>;
    }
  }
}

interface Props {
  type?: NotificationType;
  ariaLive?: AriaLiveType;
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
}: Props) => {
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
};

export default GoANotification;
