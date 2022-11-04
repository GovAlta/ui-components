import React, { useState } from "react";

type NotificationType = "important" | "information" | "event" | "emergency";

interface WCProps {
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
}

export const GoANotification = ({ type = "information", children }: Props) => {
  return <goa-notification type={type}>{children}</goa-notification>;
};

export default GoANotification;
