import { ReactNode, useRef, useLayoutEffect } from "react";

import {
  GoabFormState,
  GoabPublicFormStatus,
} from "@abgov/ui-components-common";

interface WCProps {
  ref?: React.RefObject<HTMLElement | null>;
  status?: string;
  name?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoabPublicFormProps {
  status?: GoabPublicFormStatus;
  name?: string;
  onInit?: (event: Event) => void;
  onComplete?: (event: GoabFormState) => void;
  onStateChange?: (event: GoabFormState) => void;
  children: ReactNode;
}

export function GoabPublicForm({
  status = "complete",
  name,
  onInit,
  onComplete,
  onStateChange,
  children,
}: GoabPublicFormProps) {
  const ref = useRef<HTMLElement>(null);
  const initialized = useRef(false);

  // Use useLayoutEffect to set up listeners before the component mounts
  useLayoutEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const initListener = (e: Event) => {
      onInit?.(e);
    };

    //  First time initialization, add init listener immediately
    if (onInit && !initialized.current) {
      current.addEventListener("_init", initListener);
    }

    const completeListener = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      onComplete?.(detail);
    };

    const stateChangeListener = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      onStateChange?.(detail.data);
    };

    if (onComplete) {
      current.addEventListener("_complete", completeListener);
    }

    if (onStateChange) {
      current.addEventListener("_stateChange", stateChangeListener);
    }

    return () => {
      if (onInit) {
        current.removeEventListener("_init", initListener);
      }
      if (onComplete) {
        current.removeEventListener("_complete", completeListener);
      }
      if (onStateChange) {
        current.removeEventListener("_stateChange", stateChangeListener);
      }
    };
  }, [onInit, onComplete, onStateChange]);

  return (
    <goa-public-form
      ref={ref}
      status={status}
      name={name}
    >
      {children}
    </goa-public-form>
  );
}

export default GoabPublicForm;
