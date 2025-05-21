import { ReactNode, useEffect, useRef } from "react";
import {
  GoabFieldsetOnChangeDetail,
  GoabFieldsetOnContinueDetail,
  GoabFormDispatchOn,
  Margins,
} from "@abgov/ui-components-common";

interface WCProps extends Margins {
  ref?: React.RefObject<HTMLElement | null>;
  id?: string;
  "section-title"?: string;
  "dispatch-on"?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-fieldset": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoabFieldsetProps extends Margins {
  id?: string;
  sectionTitle?: string;
  dispatchOn?: GoabFormDispatchOn;
  onContinue?: (event: GoabFieldsetOnContinueDetail) => void;
  onChange?: (event: GoabFieldsetOnChangeDetail) => void;
  children: ReactNode;
}

export function GoabFieldset({
  id,
  sectionTitle,
  dispatchOn,
  onContinue,
  onChange,
  children,

}: GoabFieldsetProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const changeListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabFieldsetOnChangeDetail>).detail;
      onChange?.(detail);
    }
    const continueListener = (e: Event) => {
      const event = (e as CustomEvent<GoabFieldsetOnContinueDetail>).detail;
      return onContinue?.(event);
    };

    if (onContinue) {
      current.addEventListener("_continue", continueListener);
    }
    if (onChange) {
      current.addEventListener("_change", changeListener);
    }

    return () => {
      if (onContinue) {
        current.removeEventListener("_continue", continueListener);
      }
      if (onChange) {
        current.removeEventListener("_change", changeListener);
      }
    };
  }, [ref, onContinue]);

  return (
    <goa-fieldset
      ref={ref}
      id={id}
      section-title={sectionTitle}
      dispatch-on={dispatchOn}
    >
      {children}
    </goa-fieldset>
  );
}

export default GoabFieldset;
