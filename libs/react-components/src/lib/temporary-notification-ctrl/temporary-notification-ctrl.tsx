import React, { useRef } from "react";

type SnackbarVerticalPosition = "top" | "bottom";
type SnackbarHorizontalPosition = "left" | "center" | "right";

interface WCProps {
  ref: React.RefObject<HTMLElement | null>;
  verticalPosition?: SnackbarVerticalPosition;
  horizontalPosition?: SnackbarHorizontalPosition;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-temp-notification-ctrl": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabTemporaryNotificationCtrlProps {
  verticalPosition?: SnackbarVerticalPosition;
  horizontalPosition?: SnackbarHorizontalPosition;
  testId?: string;
}

export const GoabTemporaryNotificationCtrl = ({
  verticalPosition = "bottom",
  horizontalPosition = "center",
  testId,
}: GoabTemporaryNotificationCtrlProps) => {
  const el = useRef<HTMLElement>(null);

  return (
    <goa-temp-notification-ctrl
      ref={el}
      vertical-position={verticalPosition}
      horizontal-position={horizontalPosition}
      testid={testId}
    />
  );
};

export default GoabTemporaryNotificationCtrl;
