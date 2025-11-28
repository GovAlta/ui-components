import { useEffect, useRef, type JSX } from "react";
import {
  GoabRadioGroupOnChangeDetail,
  GoabRadioGroupOrientation,
  Margins, DataGridProps,
} from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

export * from "./radio";

interface WCProps extends Margins {
  name: string;
  value?: string;
  id?: string;
  orientation?: GoabRadioGroupOrientation;
  disabled?: string;
  error?: string;
  arialabel?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-radio-group": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

export interface GoabRadioGroupProps extends Margins, DataGridProps {
  name: string;
  value?: string;
  id?: string;
  disabled?: boolean;
  orientation?: GoabRadioGroupOrientation;
  testId?: string;
  error?: boolean;
  ariaLabel?: string;
  children?: React.ReactNode;
  onChange?: (detail: GoabRadioGroupOnChangeDetail) => void;
}

export function GoabRadioGroup(props: GoabRadioGroupProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["disabled", "error", "onChange"],
    attributeMapping: "lowercase",
  });

  useEffect(() => {
    if (!el.current) return;

    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail;
      props.onChange?.(detail);
    };

    const currentEl = el.current;
    if (props.onChange) {
      currentEl.addEventListener("_change", listener);
    }

    return () => {
      if (props.onChange) {
        currentEl.removeEventListener("_change", listener);
      }
    };
  }, [props.name, props.onChange]);

  return (
    <goa-radio-group
      ref={el}
      disabled={props.disabled ? "true" : undefined}
      error={props.error ? "true" : undefined}
      {..._props}
    >
      {props.children}
    </goa-radio-group>
  );
}

export default GoabRadioGroup;
