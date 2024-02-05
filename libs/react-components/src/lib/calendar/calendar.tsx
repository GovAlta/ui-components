import { useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  name?: string;
  value?: string;
  min?: string;
  max?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-calendar": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoACalendarProps extends Margins {
  name?: string;
  value?: Date;
  min?: Date;
  max?: Date;
  onChange: (name: string, value: Date) => void;
}

export function GoACalendar({
  name,
  value,
  min,
  max,
  mt,
  mr,
  mb,
  ml,
  onChange,
}: GoACalendarProps): JSX.Element {
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
    <goa-calendar
      ref={ref}
      name={name}
      value={value?.toISOString()}
      min={min?.toISOString()}
      max={max?.toISOString()}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    />
  );
}

export default GoACalendar;
