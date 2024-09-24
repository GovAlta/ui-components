import { useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

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

export interface GoADatePickerProps extends Margins {
  name?: string;
  value?: Date;
  error?: boolean;
  min?: Date;
  max?: Date;
  testId?: string;
  relative?: boolean;
  disabled?: boolean;
  onChange?: (name: string, value: Date | undefined) => void;
}

export function GoADatePicker({
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
}: GoADatePickerProps): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;

    const handleChange = (e: Event) => {
      const newValue = (e as CustomEvent).detail.value;
      onChange?.(name || "", newValue ? new Date(newValue) : undefined);
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

export default GoADatePicker;
