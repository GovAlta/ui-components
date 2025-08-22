import { useEffect, useRef, type JSX } from "react";
import {
  GoabDatePickerInputType,
  GoabDatePickerOnChangeDetail,
  Margins,
} from "@abgov/ui-components-common";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
  name?: string;
  value?: string;
  error?: string;
  min?: string;
  max?: string;
  type?: string;
  relative?: string;
  disabled?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-date-picker": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabDatePickerProps extends Margins {
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
  onChange?: (detail: GoabDatePickerOnChangeDetail) => void;
}

export function GoabDatePicker({
  name,
  value,
  error,
  min,
  max,
  testId,
  disabled,
  type,
  mt,
  mr,
  mb,
  ml,
  relative,
  onChange,
}: GoabDatePickerProps): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;

    const handleChange = (e: Event) => {
      const detail = (e as CustomEvent<GoabDatePickerOnChangeDetail>).detail;
      onChange?.(detail);
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
      name={name}
      value={formatValue(value)}
      type={type}
      error={error ? "true" : undefined}
      disabled={disabled ? "true" : undefined}
      min={formatValue(min)}
      max={formatValue(max)}
      testid={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      relative={relative ? "true" : undefined}
    />
  );
}

export default GoabDatePicker;
