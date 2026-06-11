import { relay } from "../messaging/messaging";

export type GoabTemporaryNotificationType =
  | "basic"
  | "success"
  | "failure"
  | "indeterminate"
  | "progress";

export type GoabNotificationOptions = {
  /**
   * The type of notification, which determines its styling and icon. Use
   * "indeterminate" to show an animated progress bar while work of unknown
   * length runs, or "progress" to show a progress bar you update with
   * setProgress(). Defaults to "basic".
   */
  type: GoabTemporaryNotificationType;
  /**
   * How long the notification stays before it auto-dismisses: "short" (about
   * 3 seconds), "medium" (about 4 seconds), "long" (about 6 seconds), or a
   * number of milliseconds. Only "basic", "success", and "failure"
   * notifications auto-dismiss (default "short"). "indeterminate" and
   * "progress" notifications have no default duration and stay until you
   * dismiss them.
   */
  duration?: "long" | "medium" | "short" | number;
  /**
   * Text for an action button. When set, the notification shows a button the
   * user can select.
   */
  actionText?: string;
  /** Function to run when the action button is selected. */
  action?: () => void;
  /** UUID of an existing notification to cancel when this one is shown. */
  cancelUUID?: string;
  /** @internal Assigned by show(); not a public option. */
  uuid: string;
  /** @internal Managed by the notification controller. */
  visible: boolean;
};

const TypesRequiringDuration: GoabTemporaryNotificationType[] = ["basic", "success", "failure"];

/**
 * Displays a temporary notification from your component. Returns the
 * notification's UUID, which you can use to dismiss it or update its progress.
 * @param message The message to display in the notification.
 * @param options Settings for the notification's type, duration, and action.
 * @returns The UUID of the notification.
 */
function show(message: string, options?: Partial<GoabNotificationOptions>): string {
  const uuid = crypto.randomUUID();
  options = { uuid, type: "basic", ...(options || {}) };

  // set default duration for certain notification types
  if (!options.duration && options.type && TypesRequiringDuration.includes(options.type)) {
    options.duration = "short";
  }

  relay(
    document.body,
    "goa:temp-notification",
    { message: message, ...options },
    { bubbles: true },
  );

  return uuid;
}

/**
 * Hides a notification, using the UUID that show() returns.
 * @param uuid The UUID of the notification to dismiss. This is the value that
 * show() returns.
 */
function dismiss(uuid: string) {
  relay(
    document.body, "goa:temp-notification:dismiss", uuid, { bubbles: true }
  );
}

/**
 * Updates the progress shown on a progress notification, using the UUID that
 * show() returns.
 * @param uuid The UUID of the progress notification to update. This is the
 * value that show() returns.
 * @param progress The progress to display, from 0 to 100.
 */
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
