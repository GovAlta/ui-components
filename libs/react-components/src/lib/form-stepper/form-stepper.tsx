import { GoabFormStepperOnChangeDetail, Margins } from "@abgov/ui-components-common";
import { ReactNode, useEffect, useRef } from "react";

interface WCProps extends Margins {
  ref?: React.RefObject<HTMLElement | null>;
  step?: number;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-form-stepper": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabFormStepperProps extends Margins {
  /**
   * The current step state value (1-based index). Leaving it blank (-1) will allow any step to be accessed.
   * @default -1
   */
  step?: number;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /** TO DO: Write a description */
  children?: ReactNode;
  onChange?: (detail: GoabFormStepperOnChangeDetail) => void;
}

export function GoabFormStepper({
  testId,
  step,
  mt,
  mb,
  ml,
  mr,
  onChange,
  children,
}: GoabFormStepperProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const changeListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabFormStepperOnChangeDetail>).detail;
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

export default GoabFormStepper;
