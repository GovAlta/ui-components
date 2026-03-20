import { useEffect, useRef, type JSX } from "react";
import {
  DataAttributes,
  GoabCalendarOnChangeDetail,
  Margins,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  name?: string;
  value?: string;
  min?: string;
  max?: string;
  testid?: string;
}

export interface GoabCalendarProps extends Margins, DataAttributes {
  name?: string;
  value?: string;
  min?: string;
  max?: string;
  testId?: string;
  onChange: (details: GoabCalendarOnChangeDetail) => void;
}

export function GoabCalendar({
  min,
  max,
  onChange,
  name,
  ...rest
}: GoabCalendarProps): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const listener = (e: Event) => {
      onChange({
        name: name || "",
        value: (e as CustomEvent).detail.value,
      });
    };
    current.addEventListener("_change", listener);

    return () => {
      current.removeEventListener("_change", listener);
    };
  }, []);

  return (
    <goa-calendar
      ref={ref}
      name={name}
      min={min || undefined}
      max={max || undefined}
      {..._props}
    />
  );
}

export default GoabCalendar;
