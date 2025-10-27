import { ReactNode, useEffect, useRef } from "react";

interface WCProps {
  open?: string;
  testid?: string;
  ref: React.RefObject<HTMLElement | null>;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-work-side-notification-popover": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoaxWorkSideNotificationPopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  testId?: string;
  onToggle?: (isOpen: boolean) => void;
}
export function GoaxWorkSideNotificationPopover({trigger, children, open, testId, onToggle}:GoaxWorkSideNotificationPopoverProps) {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el?.current || !onToggle) {
      return;
    }
    const handleToggle = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onToggle(customEvent.detail);
    }
    el.current?.addEventListener("_toggle", handleToggle);
    return () => {
      el.current?.removeEventListener("_toggle", handleToggle);
    }
  }, [el, onToggle]);
  return (
    <goa-work-side-notification-popover
      ref={el}
      testid={testId}
      open={open ? "true" : "false"}
    >
      <div slot="trigger">{trigger}</div>
      {children}
    </goa-work-side-notification-popover>
  )
}
export default GoaxWorkSideNotificationPopover;
