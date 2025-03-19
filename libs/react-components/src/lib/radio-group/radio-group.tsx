import { useEffect, useRef } from "react";
import {
  GoabRadioGroupOnChangeDetail,
  GoabRadioGroupOrientation,
} from "@abgov/ui-components-common";

import { Margins } from "../../common/types";

export * from "./radio";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  name: string;
  value?: string;
  orientation?: GoabRadioGroupOrientation;
  disabled?: boolean;
  error?: boolean;
  arialabel?: string;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-radio-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabRadioGroupProps extends Margins {
  name: string;
  value?: string;
  disabled?: boolean;
  orientation?: GoabRadioGroupOrientation;
  testId?: string;
  error?: boolean;
  ariaLabel?: string;
  children?: React.ReactNode;
  onChange: (detail: GoabRadioGroupOnChangeDetail) => void;
}

export function GoabRadioGroup({
  name,
  value,
  children,
  orientation,
  disabled = false,
  error = false,
  testId,
  ariaLabel,
  mt,
  mr,
  mb,
  ml,
  onChange,
}: GoabRadioGroupProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const listener = (e: Event) => {
      if (!onChange) {
        console.warn("Missing onChange function");
        return;
      }
      const detail = (e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail;
      onChange(detail);
    };

    const currentEl = el.current;
    currentEl.addEventListener("_change", listener);

    return () => {
      currentEl.removeEventListener("_change", listener);
    };
  }, [name, onChange]);

  return (
    <goa-radio-group
      testid={testId}
      ref={el}
      name={name}
      value={value}
      orientation={orientation}
      disabled={disabled}
      error={error}
      arialabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-radio-group>
  );
}

export default GoabRadioGroup;
