import { ReactNode, useEffect, useRef } from "react";
import {
  GoabFieldsetOnContinueDetail,
  GoabFormDispatchOn,
} from "@abgov/ui-components-common";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps {
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

interface GoabFieldsetProps extends DataGridProps {
  id?: string;
  sectionTitle?: string;
  dispatchOn?: GoabFormDispatchOn;
  onContinue?: (event: GoabFieldsetOnContinueDetail) => void;
  children: ReactNode;
}

export function GoabFieldset(props: GoabFieldsetProps) {
  const [dataGridProps, {
    id,
    sectionTitle,
    dispatchOn,
    onContinue,
    children,
  }] = useDataGridProps(props);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const continueListener = (e: Event) => {
      const event = (e as CustomEvent<GoabFieldsetOnContinueDetail>).detail;
      return onContinue?.(event);
    };

    if (onContinue) {
      current.addEventListener("_continue", continueListener);
    }

    return () => {
      if (onContinue) {
        current.removeEventListener("_continue", continueListener);
      }
    };
  }, [ref, onContinue]);

  return (
    <goa-fieldset
      ref={ref}
      id={id}
      section-title={sectionTitle}
      dispatch-on={dispatchOn}
      {...dataGridProps}
    >
      {children}
    </goa-fieldset>
  );
}

export default GoabFieldset;
