import { GoABFormStepperOnChangeDetail, Margins } from "@abgov/ui-components-common";
import { ReactNode, useEffect, useRef } from "react";

interface WCProps extends Margins {
  ref?: React.MutableRefObject<HTMLElement | null>;
  step?: number;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-form-stepper": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABFormStepperProps extends Margins {
  step?: number;
  testId?: string;
  children?: ReactNode;
  onChange?: (detail: GoABFormStepperOnChangeDetail) => void;
}

export function GoABFormStepper({
  testId,
  step,
  mt,
  mb,
  ml,
  mr,
  onChange,
  children,
}: GoABFormStepperProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const changeListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoABFormStepperOnChangeDetail>).detail;
      onChange?.(detail);
    };

    current.addEventListener("_change", changeListener);
    return () => {
      current.removeEventListener("_change", changeListener);
    };
  }, [ref, onChange]);

  return (
    <goa-form-stepper
      ref={ref}
      testid={testId}
      data-testid={testId}
      step={step}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-form-stepper>
  );
}

export default GoABFormStepper;
