import { useEffect, useRef, type JSX } from "react";
import { GoabCalendarOnChangeDetail, Margins } from "@abgov/ui-components-common";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
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
      "goa-calendar": WCProps & React.HTMLAttributes<HTMLElement>;
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
  const [dataGridProps, {
    name,
    value,
    min,
    max,
    testId,
    mt,
    mr,
    mb,
    ml,
    onChange
  }] = useDataGridProps(props);

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
      value={value}
      min={min || undefined}
      max={max || undefined}
      testid={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      {...dataGridProps}
    />
  );
}

export default GoabCalendar;
