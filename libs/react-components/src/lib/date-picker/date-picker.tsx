import { useEffect, useRef } from "react";
import { ABGovDatePickerOnChangeDetail, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  name?: string;
  value?: string;
  error?: boolean;
  min?: string;
  max?: string;
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

export interface ABGovDatePickerProps extends Margins {
  name?: string;
  value?: Date;
  error?: boolean;
  min?: Date;
  max?: Date;
  testId?: string;
  onChange: (detail: ABGovDatePickerOnChangeDetail) => void;
}

export function ABGovDatePicker({
  name,
  value,
  error,
  min,
  max,
  testId,
  mt,
  mr,
  mb,
  ml,
  onChange,
}: ABGovDatePickerProps): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;

    const handleChange = (e: Event) => {
      const detail = (e as CustomEvent<ABGovDatePickerOnChangeDetail>).detail;
      onChange(detail);
    }

    current.addEventListener("_change", handleChange);

    return () => {
      current.removeEventListener("_change", handleChange);
    }
  }, [onChange]);

  return (
    <goa-date-picker
      ref={ref}
      name={name}
      value={value?.toISOString()}
      error={error}
      min={min?.toISOString()}
      max={max?.toISOString()}
      data-testid={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    />
  );
}

export default ABGovDatePicker;
