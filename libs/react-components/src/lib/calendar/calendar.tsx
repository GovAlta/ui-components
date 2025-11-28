import { useEffect, useRef, type JSX } from "react";
import { DataGridProps, GoabCalendarOnChangeDetail, Margins } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps extends Margins {
  name?: string;
  value?: string;
  min?: string;
  max?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-calendar": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}
export interface GoabCalendarProps extends Margins, DataGridProps {
  name?: string;
  value?: string;
  min?: string;
  max?: string;
  testId?: string;
  onChange: (details: GoabCalendarOnChangeDetail) => void;
}

export function GoabCalendar(props: GoabCalendarProps): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["min", "max", "onChange"],
    attributeMapping: "lowercase",
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const listener = (e: Event) => {
      props.onChange({
        name: props.name || "",
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
      min={props.min || undefined}
      max={props.max || undefined}
      {..._props}
    />
  );
}

export default GoabCalendar;
