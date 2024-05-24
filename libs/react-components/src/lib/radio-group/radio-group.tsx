import { useEffect, useRef } from "react";
import { ABGovRadioGroupOnChangeDetail, ABGovRadioGroupOrientation, Margins } from "@abgov/ui-components-common";

export * from "./radio";


interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  name: string;
  value?: string;
  orientation?: ABGovRadioGroupOrientation;
  disabled?: boolean;
  error?: boolean;
  arialabel?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-radio-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface ABGovRadioGroupProps extends Margins {
  name: string;
  value?: string;
  disabled?: boolean;
  orientation?: ABGovRadioGroupOrientation;
  testId?: string;
  error?: boolean;
  ariaLabel?: string;
  children?: React.ReactNode;
  onChange: (detail: ABGovRadioGroupOnChangeDetail) => void;
}

export function ABGovRadioGroup({
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
}: ABGovRadioGroupProps): JSX.Element {

  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return

    const listener = (e: Event) => {
      if (!onChange) {
        console.warn("Missing onChange function");
        return;
      }
      const detail = (e as CustomEvent<ABGovRadioGroupOnChangeDetail>).detail;
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
      data-testid={testId}
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

export default ABGovRadioGroup;
