import { ReactNode, useRef, useLayoutEffect } from "react";

import {
  DataGridProps,
  GoabFormState,
  GoabPublicFormStatus,
} from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps {
  status?: string;
  name?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

interface GoabPublicFormProps extends DataGridProps {
  status?: GoabPublicFormStatus;
  name?: string;
  onInit?: (event: Event) => void;
  onComplete?: (event: GoabFormState) => void;
  onStateChange?: (event: GoabFormState) => void;
  children: ReactNode;
}

export function GoabPublicForm(props: GoabPublicFormProps) {
  const ref = useRef<HTMLElement>(null);
  const initialized = useRef(false);

  const _props = extractProps<WCProps>(props, {
    exclude: ["onInit", "onComplete", "onStateChange"],
    attributeMapping: "lowercase",
  });

  // Use useLayoutEffect to set up listeners before the component mounts
  useLayoutEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const initListener = (e: Event) => {
      props.onInit?.(e);
    };

    //  First time initialization, add init listener immediately
    if (props.onInit && !initialized.current) {
      current.addEventListener("_init", initListener);
    }

    const completeListener = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      props.onComplete?.(detail);
    };

    const stateChangeListener = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      props.onStateChange?.(detail.data);
    };

    if (props.onComplete) {
      current.addEventListener("_complete", completeListener);
    }

    if (props.onStateChange) {
      current.addEventListener("_stateChange", stateChangeListener);
    }

    return () => {
      if (props.onInit) {
        current.removeEventListener("_init", initListener);
      }
      if (props.onComplete) {
        current.removeEventListener("_complete", completeListener);
      }
      if (props.onStateChange) {
        current.removeEventListener("_stateChange", stateChangeListener);
      }
    };
  }, [props.onInit, props.onComplete, props.onStateChange]);

  return (
    <goa-public-form ref={ref} {..._props}>
      {props.children}
    </goa-public-form>
  );
}

export default GoabPublicForm;
