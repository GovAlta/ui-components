import { useEffect, useRef, type JSX } from "react";
import {
  CalendarDate,
  GoabDatePickerInputType,
  GoabDatePickerOnChangeDetail,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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

export interface GoabDatePickerProps extends Margins, DataAttributes {
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

export function GoabDatePicker({
  value,
  error,
  min,
  max,
  disabled,
  relative,
  onChange,
  ...rest
}: GoabDatePickerProps): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (value && typeof value !== "string") {
      console.warn(
        "Using a `Date` type for value is deprecated. Instead use a string of the format `yyyy-mm-dd`",
      );
    }
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;

    const handleChange = (e: Event) => {
      const detail = (e as CustomEvent<GoabDatePickerOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };

    if (onChange) {
      current.addEventListener("_change", handleChange);
    }

    return () => {
      if (onChange) {
        current.removeEventListener("_change", handleChange);
      }
    };
  }, [onChange]);

  const formatValue = (val: Date | string | undefined) => {
    if (!val) return "";

    if (val instanceof Date) {
      return new CalendarDate(val).toString();
    }

    return val;
  };

  return (
    <goa-date-picker
      ref={ref}
      value={formatValue(value) || undefined}
      error={error ? "true" : undefined}
      disabled={disabled ? "true" : undefined}
      min={formatValue(min) || undefined}
      max={formatValue(max) || undefined}
      relative={relative ? "true" : undefined}
      {..._props}
    />
  );
}

export default GoabDatePicker;
