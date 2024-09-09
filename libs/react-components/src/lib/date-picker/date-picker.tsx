import { useEffect, useRef } from "react";
import { GoabDatePickerOnChangeDetail, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  name?: string;
  value?: string;
  error?: boolean;
  min?: string;
  max?: string;
  relative?: boolean;
  disabled?: boolean;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-date-picker": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabDatePickerProps extends Margins {
  name?: string;
  value?: Date;
  error?: boolean;
  min?: Date;
  max?: Date;
  testId?: string;
  relative?: boolean;
  disabled?: boolean;
  onChange: (detail: GoabDatePickerOnChangeDetail) => void;
}

export function GoabDatePicker({
  name,
  value,
  error,
  min,
  max,
  testId,
  disabled,
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
      onChange(detail);
    };

    current.addEventListener("_change", handleChange);

    return () => {
      current.removeEventListener("_change", handleChange);
    };
  }, [onChange]);

  return (
    <goa-date-picker
      ref={ref}
      name={name}
      value={value?.toISOString() || ""}
      error={error}
      disabled={disabled}
      min={min?.toISOString()}
      max={max?.toISOString()}
      testid={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      relative={relative}
    />
  );
}

export default GoabDatePicker;
