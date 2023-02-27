import React, { useEffect, useRef } from "react";

export type NotificationType =
  | "important"
  | "information"
  | "event"
  | "emergency";

interface WCProps {
  ref: React.RefObject<HTMLElement>;
  type: NotificationType;
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
  children?: React.ReactNode;
  onDismiss?: () => void;
  testId?: string;
}

export const GoANotification = ({
  type = "information",
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
    <goa-notification ref={el} type={type} data-testid={testId}>
      {children}
    </goa-notification>
  );
};

export default GoANotification;
