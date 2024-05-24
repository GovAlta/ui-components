import { ABGovFormStepStatus } from "@abgov/ui-components-common";

interface WCProps {
  text: string;
  status?: ABGovFormStepStatus;
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

export interface ABGovFormStepProps {
  text: string;
  status?: ABGovFormStepStatus;
}

export function ABGovFormStep(props: ABGovFormStepProps) {
  return <goa-form-step text={props.text} status={props.status} />;
}

export default ABGovFormStep;
