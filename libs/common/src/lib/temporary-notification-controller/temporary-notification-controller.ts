import { relay } from "../messaging/messaging";

export type GoabTemporaryNotificationType = "basic" | "success" | "failure" | "indeterminate" | "progress";

export type GoabNotificationOptions = {
  type: GoabTemporaryNotificationType,
  uuid: string;
  cancelUUID?: string;
  duration?: number;
  actionText?: string;
  action?: () => void;
  visible: boolean;
}

export function sendTemporaryNotification(message: string, opts?: Partial<GoabNotificationOptions>): string {
  const uuid = crypto.randomUUID();
  opts = { uuid, type: "basic", ...(opts || {}) };
  relay(document.body, "goa:temp-notification", {
    message: message,
    ...opts
  }, { bubbles: true});
  return uuid;
}

export function sendTemporaryNotificationProgress(progress: number) {
  relay(document.body, "goa:temp-notification:progress", { progress }, { bubbles: true});
}
