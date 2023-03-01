import React from "react";

type Status = "complete" | "incomplete";

interface WCProps {
  text: string;
  status?: Status;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-form-step": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface FormStepProps {
  text: string;
  status?: Status;
}

export function GoAFormStep(props: FormStepProps) {
  return <goa-form-step text={props.text} status={props.status} />;
}

export default GoAFormStep;
