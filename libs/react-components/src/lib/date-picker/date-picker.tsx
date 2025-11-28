import { useEffect, useRef, type JSX } from "react";
import {
  GoabDatePickerInputType,
  GoabDatePickerOnChangeDetail,
  Margins, DataGridProps,
} from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps extends Margins {
  name?: string;
  value?: string;
  error?: string;
  min?: string;
  max?: string;
  type?: string;
  relative?: string;
  disabled?: string;
  testid?: string;
  width?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-date-picker": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

export interface GoabDatePickerProps extends Margins, DataGridProps {
  name?: string;
  value?: Date | string | undefined;
  error?: boolean;
  min?: Date | string;
  max?: Date | string;
  type?: GoabDatePickerInputType;
  testId?: string;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  relative?: boolean;
  disabled?: boolean;
  width?: string;
  onChange?: (detail: GoabDatePickerOnChangeDetail) => void;
}

export function GoabDatePicker(props: GoabDatePickerProps): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["value", "error", "min", "max", "disabled", "relative", "onChange"],
    attributeMapping: "lowercase",
  });

  useEffect(() => {
    if (props.value && typeof props.value !== "string") {
      console.warn("Using a `Date` type for value is deprecated. Instead use a string of the format `yyyy-mm-dd`")
    }
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;

    const handleChange = (e: Event) => {
      const detail = (e as CustomEvent<GoabDatePickerOnChangeDetail>).detail;
      props.onChange?.(detail);
    };

    if (props.onChange) {
      current.addEventListener("_change", handleChange);
    }

    return () => {
      if (props.onChange) {
        current.removeEventListener("_change", handleChange);
      }
    };
  }, [props.onChange]);

  const formatValue = (value: Date | string | undefined) => {
    if (!value) return "";

    if (value instanceof Date) {
      return value.toISOString();
    }

    return value;
  };

  return (
    <goa-date-picker
      ref={ref}
      value={formatValue(props.value) || undefined}
      error={props.error ? "true" : undefined}
      disabled={props.disabled ? "true" : undefined}
      min={formatValue(props.min) || undefined}
      max={formatValue(props.max) || undefined}
      relative={props.relative ? "true" : undefined}
      {..._props}
    />
  );
}

export default GoabDatePicker;
