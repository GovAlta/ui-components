import { useEffect, useRef, type JSX } from "react";
import { GoabDatePickerOnChangeDetail, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
  name?: string;
  value?: string;
  error?: string;
  min?: string;
  max?: string;
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
  value?: Date;
  error?: boolean;
  min?: Date;
  max?: Date;
  testId?: string;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
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
      error={error ? "true" : undefined}
      disabled={disabled ? "true" : undefined}
      min={min?.toISOString()}
      max={max?.toISOString()}
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
