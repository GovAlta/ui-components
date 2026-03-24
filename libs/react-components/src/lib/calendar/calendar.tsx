import { useEffect, useRef, type JSX } from "react";
import { DataAttributes, GoabCalendarOnChangeDetail, Margins } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  name?: string;
  value?: string;
  min?: string;
  max?: string;
  testid?: string;
}

export interface GoabCalendarProps extends Margins, DataAttributes {
  /**
   * Name identifier for the calendar, included in change events.
   * @default ""
   */
  name?: string;
  /**
   * The currently selected date value in YYYY-MM-DD format.
   * @default ""
   */
  value?: string;
  /**
   * The minimum selectable date in YYYY-MM-DD format. Defaults to 5 years in the past.
   * @default ""
   */
  min?: string;
  /**
   * The maximum selectable date in YYYY-MM-DD format. Defaults to 5 years in the future.
   * @default ""
   */
  max?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
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
    }
    current.addEventListener("_change", listener);

    return () => {
      current.removeEventListener("_change", listener);
    }
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
