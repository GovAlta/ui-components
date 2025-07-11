import { relay } from "../messaging/messaging";

export type GoabTemporaryNotificationType =
  | "basic"
  | "success"
  | "failure"
  | "indeterminate"
  | "progress";

export type GoabNotificationOptions = {
  type: GoabTemporaryNotificationType;
  uuid: string;
  cancelUUID?: string;
  duration?: "long" | "medium" | "short" | number;
  actionText?: string;
  action?: () => void;
  visible: boolean;
};

const TypesRequiringDuration: GoabTemporaryNotificationType[] = ["basic", "success", "failure"];

function show(message: string, opts?: Partial<GoabNotificationOptions>): string {
  const uuid = crypto.randomUUID();
  opts = { uuid, type: "basic", ...(opts || {}) };
  // set default duration for certain notification types
  if (opts.duration === undefined && opts.type && TypesRequiringDuration.includes(opts.type)) {
    opts.duration = "short";
  }

  relay(
    document.body,
    "goa:temp-notification",
    { message: message, ...opts },
    { bubbles: true },
  );

  return uuid;
}

function dismiss(uuid: string) {
  relay(
    document.body, "goa:temp-notification:dismiss", uuid, { bubbles: true }
  );
}

function setProgress(uuid: string, progress: number) {
  relay(
    document.body,
    "goa:temp-notification:progress",
    { uuid, progress },
    { bubbles: true },
  );
}

export const TemporaryNotification = {
  show,
  dismiss,
  setProgress,
};
