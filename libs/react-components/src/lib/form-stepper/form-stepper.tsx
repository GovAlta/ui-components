import { ReactNode, useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

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

export interface GoAFormStepperProps extends Margins {
  step?: number;
  testId?: string;
  children?: ReactNode;
  onChange?: (step: number) => void;
}

// legacy
export type FormStepperProps = GoAFormStepperProps;

export function GoAFormStepper({
  testId,
  step,
  mt,
  mb,
  ml,
  mr,
  onChange,
  children,
}: GoAFormStepperProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const changeListener = (e: unknown) => {
      const { step } = (e as CustomEvent).detail;
      onChange?.(+step);
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

export default GoAFormStepper;
