import { useEffect, useRef, type JSX } from "react";
import {
  CalendarDate,
  GoabDatePickerInputType,
  GoabDatePickerOnBlurDetail,
  GoabDatePickerOnChangeDetail,
  GoabDatePickerOnFocusDetail,
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
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-date-picker": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

export interface GoabDatePickerProps extends Margins, DataAttributes {
  /** Sets the date picker type. 'calendar' shows a calendar popup, 'input' shows just a date input. @default "calendar" */
  type?: GoabDatePickerInputType;
  /** Name of the date field. */
  name?: string;
  /** Sets the calendar date as an ISO date string (yyyy-mm-dd). */
  value?: Date | string | undefined;
  /** Sets the input to an error state. */
  error?: boolean;
  /** Sets the earliest allowed date as an ISO date string (yyyy-mm-dd). */
  min?: Date | string;
  /** Sets the latest allowed date as an ISO date string (yyyy-mm-dd). */
  max?: Date | string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** @deprecated This property has no effect and will be removed in a future version. */
  relative?: boolean;
  /** Disables the date picker. */
  disabled?: boolean;
  /** Sets the width of the date picker input. */
  width?: string;
  /** Callback fired when the selected date changes. */
  onChange?: (detail: GoabDatePickerOnChangeDetail) => void;
  /** Callback fired when focus enters any of the date picker's internal fields. */
  onFocus?: (detail: GoabDatePickerOnFocusDetail) => void;
  /** Callback fired when focus leaves all of the date picker's internal fields. */
  onBlur?: (detail: GoabDatePickerOnBlurDetail) => void;
}

/** Lets users select a date through a calendar without the need to manually type it in a field. */
export function GoabDatePicker({
  value,
  error,
  min,
  max,
  disabled,
  relative,
  onChange,
  onFocus,
  onBlur,
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
    const handleFocus = (e: Event) => {
      const detail = (e as CustomEvent<GoabDatePickerOnFocusDetail>).detail;
      onFocus?.({ ...detail, event: e });
    };
    const handleBlur = (e: Event) => {
      const detail = (e as CustomEvent<GoabDatePickerOnBlurDetail>).detail;
      onBlur?.({ ...detail, event: e });
    };

    if (onChange) {
      current.addEventListener("_change", handleChange);
    }
    current.addEventListener("_focus", handleFocus);
    current.addEventListener("_blur", handleBlur);

    return () => {
      if (onChange) {
        current.removeEventListener("_change", handleChange);
      }
      current.removeEventListener("_focus", handleFocus);
      current.removeEventListener("_blur", handleBlur);
    };
  }, [onChange, onFocus, onBlur]);

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
      version="2"
      {..._props}
    />
  );
}

export default GoabDatePicker;
