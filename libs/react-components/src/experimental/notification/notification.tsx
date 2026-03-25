import {
  GoabAriaLiveType,
  GoabNotificationEmphasis,
  GoabNotificationType,
} from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

interface WCProps {
  ref: React.RefObject<HTMLElement | null>;
  type: GoabNotificationType;
  maxcontentwidth?: string;
  arialive?: GoabAriaLiveType;
  testid?: string;
  emphasis?: GoabNotificationEmphasis;
  compact?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-notification": WCProps & React.HTMLAttributes<HTMLButtonElement>;
    }
  }
}

export interface GoabxNotificationProps {
  /**
   * Define the context and colour of the notification.
   * @default "information"
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
  /**
   * Sets the visual prominence. 'high' for full background, 'filled' for medium.
   * @default "high"
   */
  emphasis?: GoabNotificationEmphasis;
  /**
   * When true, reduces padding for a more compact notification.
   * @default false
   */
  compact?: boolean;
  /** TO REVIEW: The message content rendered inside the notification. */
  children?: React.ReactNode;
  onDismiss?: () => void;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  version?: string;
}

export const GoabxNotification = ({
  type = "information",
  emphasis = "high",
  compact,
  ariaLive,
  maxContentWidth,
  children,
  testId,
  onDismiss,
  version = "2",
}: GoabxNotificationProps) => {
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
      emphasis={emphasis}
      compact={compact ? "true" : undefined}
      version={version}
    >
      {children}
    </goa-notification>
  );
};

export default GoabxNotification;
