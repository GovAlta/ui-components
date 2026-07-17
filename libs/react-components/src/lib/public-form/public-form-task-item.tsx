import { useEffect, useRef, type JSX } from "react";
import { GoabPublicFormTaskStatus } from "@abgov/ui-components-common";

interface WCProps {
  heading?: string;
  status?: string;
  hint?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form-task-item": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

export interface GoabPublicFormTaskItemProps {
  /** The task name (left column). */
  heading?: string;
  /** The task's progress. "cannot-start" renders as muted text and is not clickable. */
  status?: GoabPublicFormTaskStatus;
  /** Optional secondary line under the name, e.g. why a locked task can't start. */
  hint?: string;
  /** Fired when an interactive (not "cannot-start") task is clicked or activated by keyboard. */
  onClick?: () => void;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

/** One task row on the task list: name, status, optional hint. Emits onClick when actioned. */
export function GoabPublicFormTaskItem({
  heading,
  status,
  hint,
  onClick,
  testId,
}: GoabPublicFormTaskItemProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const listener = () => onClick?.();
    el.addEventListener("_click", listener);
    return () => el.removeEventListener("_click", listener);
  }, [onClick]);

  return (
    <goa-public-form-task-item
      ref={ref}
      heading={heading}
      status={status}
      hint={hint}
      testid={testId}
    />
  );
}

export default GoabPublicFormTaskItem;
