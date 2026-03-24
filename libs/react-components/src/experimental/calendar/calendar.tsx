import { useEffect, useRef, type JSX } from "react";
import {
  DataAttributes,
  GoabCalendarOnChangeDetail,
  Margins,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../../lib/common/extract-props";

interface WCProps extends Margins {
  name?: string;
  value?: string;
  min?: string;
  max?: string;
  testid?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-calendar": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}
export interface GoabxCalendarProps extends Margins, DataAttributes {
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
  version?: string;
  onChange: (details: GoabCalendarOnChangeDetail) => void;
}

export function GoabxCalendar({
  min,
  max,
  onChange,
  name,
  version = "2",
  ...rest
}: GoabxCalendarProps): JSX.Element {
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
      version={version}
      {..._props}
    />
  );
}

export default GoabxCalendar;
