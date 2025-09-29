import { useEffect, useRef, type JSX } from "react";
import {
  GoabRadioGroupOnChangeDetail,
  GoabRadioGroupOrientation,
  Margins,
} from "@abgov/ui-components-common";

export * from "./radio";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
  name: string;
  value?: string;
  id?: string;
  orientation?: GoabRadioGroupOrientation;
  disabled?: string;
  error?: string;
  arialabel?: string;
  testid?: string;
}

declare module "react" {
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
  id?: string;
  disabled?: boolean;
  orientation?: GoabRadioGroupOrientation;
  testId?: string;
  error?: boolean;
  ariaLabel?: string;
  children?: React.ReactNode;
  onChange?: (detail: GoabRadioGroupOnChangeDetail) => void;
}

export function GoabRadioGroup({
  name,
  value,
  children,
  orientation,
  disabled,
  error,
  id,
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
      const detail = (e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail;
      onChange?.(detail);
    };

    const currentEl = el.current;
    if (onChange) {
      currentEl.addEventListener("_change", listener);
    }

    return () => {
      if (onChange) {
        currentEl.removeEventListener("_change", listener);
      }
    };
  }, [name, onChange]);

  return (
    <goa-radio-group
      testid={testId}
      ref={el}
      id={id}
      name={name}
      value={value}
      orientation={orientation}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
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
