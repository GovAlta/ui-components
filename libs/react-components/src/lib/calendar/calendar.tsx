import { useEffect, useRef } from "react";
import { GoabCalendarOnChangeDetail, Margins } from "../../common/types";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  name?: string;
  value?: string;
  min?: string;
  max?: string;
  testid?: string;
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
export interface GoabCalendarProps extends Margins {
  name?: string;
  value?: Date;
  min?: Date;
  max?: Date;
  testId?: string;
  onChange: (details: GoabCalendarOnChangeDetail) => void;
}

export function GoabCalendar({
  name,
  value,
  min,
  max,
  testId,
  mt,
  mr,
  mb,
  ml,
  onChange,
}: GoabCalendarProps): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
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
    />
  );
}

export default GoabCalendar;
