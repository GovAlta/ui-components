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
  value?: Date;
  min?: Date;
  max?: Date;
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
    current.addEventListener("_change", (e: Event) => {
      onChange({
        name: name || "",
        value: (e as CustomEvent).detail.value,
      });
    });
  });

  return (
    <goa-calendar
      ref={ref}
      name={name}
      value={value?.toISOString()}
      min={min?.toISOString()}
      max={max?.toISOString()}
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
