import { useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

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

export interface GoADatePickerProps extends Margins {
  name?: string;
  value?: Date;
  error?: boolean;
  min?: Date;
  max?: Date;
  testId?: string;
  onChange: (name: string, value: Date) => void;
}

export function GoADatePicker({
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
}: GoADatePickerProps): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    current.addEventListener("_change", (e: Event) => {
      onChange(name || "", (e as CustomEvent).detail.value);
    });
  });

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

export default GoADatePicker;
