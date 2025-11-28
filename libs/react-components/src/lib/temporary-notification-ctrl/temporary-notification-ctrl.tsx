import React, { useRef } from "react";
import { extractProps } from "../common/extract-props";

type SnackbarVerticalPosition = "top" | "bottom";
type SnackbarHorizontalPosition = "left" | "center" | "right";

interface WCProps {
  "vertical-position"?: SnackbarVerticalPosition;
  "horizontal-position"?: SnackbarHorizontalPosition;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-temp-notification-ctrl": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
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
  ...props
}: GoabTemporaryNotificationCtrlProps) => {
  const el = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(
    { verticalPosition, horizontalPosition, ...props },
    {
      exclude: ["testId"],
      attributeMapping: "kebab",
    }
  );

  return (
    <goa-temp-notification-ctrl
      ref={el}
      {..._props}
      testid={props.testId}
    />
  );
};

export default GoabTemporaryNotificationCtrl;
