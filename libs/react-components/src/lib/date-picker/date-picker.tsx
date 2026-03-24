import { useEffect, useRef, type JSX } from "react";
import {
  CalendarDate,
  GoabDatePickerInputType,
  GoabDatePickerOnChangeDetail,
  Margins, DataAttributes,
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
  /**
   * Name of the date field.
   * @default ""
   */
  name?: string;
  /**
   * Value of the calendar date.
   * @default ""
   */
  value?: Date | string | undefined;
  /**
   * Sets the input to an error state.
   * @default false
   */
  error?: boolean;
  /**
   * Minimum date value allowed.
   * @default ""
   */
  min?: Date | string;
  /**
   * Maximum date value allowed.
   * @default ""
   */
  max?: Date | string;
  /**
   * Sets the date picker type. 'calendar' shows a calendar popup, 'input' shows just a date input.
   * @default "calendar"
   */
  type?: GoabDatePickerInputType;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  relative?: boolean;
  /**
   * Disables the date picker.
   * @default false
   */
  disabled?: boolean;
  /**
   * Sets the width of the date picker input.
   * @default ""
   */
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
