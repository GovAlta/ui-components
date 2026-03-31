import { ReactNode, useEffect, useRef } from "react";
import { Margins, DataAttributes } from "@abgov/ui-components-common";
import { transformProps, kebab } from "../common/extract-props";

interface WCProps extends Margins {
  id?: string;
  name?: string;
  "continue-msg"?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-subform": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

interface GoabPublicSubformProps extends Margins, DataAttributes {
  /** Content rendered inside the subform. */
  children: ReactNode;
  /** Sets the unique identifier for the subform. */
  id?: string;
  /** Sets the name identifier for the subform. */
  name?: string;
  /** Sets the message displayed on the continue button. */
  continueMsg?: string;
  /** Callback fired when the subform is initialized. */
  onInit?: (event: Event) => void;
  /** Callback fired when the subform state changes. */
  onStateChange?: (event: Event) => void;
}

export function GoabPublicSubform({
  id = "",
  name = "",
  continueMsg = "",
  onInit,
  onStateChange,
  children,
  ...rest
}: GoabPublicSubformProps) {
  const ref = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(
    { id, name, "continue-msg": continueMsg, ...rest },
    kebab,
  );

  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const initListener = (e: Event) => {
      onInit?.(e);
    };

    const stateChangeListener = (e: Event) => {
      onStateChange?.(e);
    };

    if (onInit) {
      current.addEventListener("_init", initListener);
    }
    if (onStateChange) {
      current.addEventListener("_stateChange", stateChangeListener);
    }

    return () => {
      if (onInit) {
        current.removeEventListener("_init", initListener);
      }
      if (onStateChange) {
        current.removeEventListener("_stateChange", stateChangeListener);
      }
    };
  }, [ref, onInit, onStateChange]);

  return (
    <goa-public-subform ref={ref} {..._props}>
      {children}
    </goa-public-subform>
  );
}

export default GoabPublicSubform;
