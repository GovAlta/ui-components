import React, { FC, useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

interface Props extends Margins {
  name?: string;
  value?: Date;
  min?: Date;
  max?: Date;
  onChange: (name: string, value: Date) => void;
}

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
      "goa-date-picker": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export const GoADatePicker: FC<Props> = ({
  name,
  value,
  min,
  max,
  mt,
  mr,
  mb,
  ml,
  onChange,
}: Props) => {
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
      min={min?.toISOString()}
      max={max?.toISOString()}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    />
  );
};

export default GoADatePicker;
