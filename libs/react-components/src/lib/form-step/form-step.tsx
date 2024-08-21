import { GoabFormStepStatus } from "@abgov/ui-components-common";

interface WCProps {
  text: string;
  status?: GoabFormStepStatus;
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

export interface GoABFormStepProps {
  text: string;
  status?: GoabFormStepStatus;
}

export function GoABFormStep(props: GoABFormStepProps) {
  return <goa-form-step text={props.text} status={props.status} />;
}

export default GoABFormStep;
