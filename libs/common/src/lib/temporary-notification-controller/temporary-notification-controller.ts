import { relay } from "../messaging/messaging";

export type GoabTemporaryNotificationDuration = "short" | "medium" | "long" | number;
export type GoabTemporaryNotificationType = "basic" | "success" | "failure" | "indeterminate" | "progress";

type GoabNotificationOptions = {
  type: GoabTemporaryNotificationType,
  duration?: GoabTemporaryNotificationDuration;
  actionText?: string;
  action?: () => void;
  visible: boolean;
}

export function sendTemporaryNotification(message: string, opts?: Partial<GoabNotificationOptions>) {
  opts = { type: "basic", ...(opts || {}) };
  relay(document.body, "goa:temp-notification", {
    message: message,
    ...opts
  }, { bubbles: true});
}


export function sendTemporaryNotificationProgress(progress: number) {
  relay(document.body, "goa:temp-notification:progress", { progress }, { bubbles: true});
}
