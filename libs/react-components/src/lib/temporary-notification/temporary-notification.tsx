import { useEffect, useRef } from "react";

type SnackbarType = "basic" | "success" | "failure";
type AnimationDirection = "up" | "down";

interface WCProps {
  ref: React.RefObject<HTMLElement | null>;
  message?: string;
  type?: SnackbarType;
  duration?: number;
  progress?: number;
  testid?: string;
  "action-text"?: string;
  visible?: boolean;
  "animation-direction"?: AnimationDirection;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-temp-notification": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabTemporaryNotificationProps {
  message?: string;
  type?: SnackbarType;
  duration?: number;
  progress?: number;
  testId?: string;
  actionText?: string;
  visible?: boolean;
  animationDirection?: AnimationDirection;
  onAction?: () => void;
}

export const GoabTemporaryNotification = ({
  message = "",
  type = "basic",
  duration,
  progress,
  testId,
  actionText,
  visible = true,
  animationDirection = "down",
  onAction,
}: GoabTemporaryNotificationProps) => {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = () => {
      onAction?.();
    };

    current.addEventListener("action", listener);
    return () => {
      current.removeEventListener("action", listener);
    };
  }, [el, onAction]);

  return (
    <goa-temp-notification
      ref={el}
      message={message}
      type={type}
      duration={duration}
      progress={progress}
      testid={testId}
      action-text={actionText}
      visible={visible}
      animation-direction={animationDirection}
    />
  );
};

export default GoabTemporaryNotification;
