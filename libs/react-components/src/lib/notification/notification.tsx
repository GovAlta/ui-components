import { GoabAriaLiveType, GoabNotificationType } from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

export interface GoabNotificationProps {
  /**
   * Define the context and colour of the notification.
   * @default ""
   */
  type?: GoabNotificationType;
  /**
   * Indicates how assistive technology should handle updates to the live region.
   * @default "polite"
   */
  ariaLive?: GoabAriaLiveType;
  /**
   * Maximum width of the content area.
   * @default "100%"
   */
  maxContentWidth?: string;
  /** TO DO: Write a description */
  children?: React.ReactNode;
  onDismiss?: () => void;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
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
