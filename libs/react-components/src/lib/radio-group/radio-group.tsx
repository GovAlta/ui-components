import { useEffect, useRef, type JSX } from "react";
import {
  GoabRadioGroupOnChangeDetail,
  GoabRadioGroupOrientation,
  GoabRadioGroupSize,
  Margins, DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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
  size?: GoabRadioGroupSize;
  version?: string;
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

export interface GoabRadioGroupProps extends Margins, DataAttributes {
  name: string;
  value?: string;
  id?: string;
  disabled?: boolean;
  orientation?: GoabRadioGroupOrientation;
  size?: GoabRadioGroupSize;
  testId?: string;
  error?: boolean;
  ariaLabel?: string;
  children?: React.ReactNode;
  onChange?: (detail: GoabRadioGroupOnChangeDetail) => void;
}

export function GoabRadioGroup({
  disabled,
  error,
  onChange,
  name,
  children,
  size = "default",
  ...rest
}: GoabRadioGroupProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>({ size, ...rest }, lowercase);

  useEffect(() => {
    if (!el.current) return;

    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };

    const currentEl = el.current;
    if (onChange) {
      currentEl.addEventListener("_change", listener);
    }

    return () => {
      if (onChange) {
        currentEl.removeEventListener("_change", listener);
      }
    };
  }, [name, onChange]);

  return (
    <goa-radio-group
      ref={el}
      {..._props}
      name={name}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      version="2"
    >
      {children}
    </goa-radio-group>
  );
}

export default GoabRadioGroup;
