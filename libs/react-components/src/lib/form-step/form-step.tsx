import { GoabFormStepStatus } from "@abgov/ui-components-common";

interface WCProps {
  text: string;
  status?: GoabFormStepStatus;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-form-step": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabFormStepProps {
  /** @required The step label text displayed to users. */
  text: string;
  /** The completion status of the step. Affects visual styling and icons. */
  status?: GoabFormStepStatus;
}

/** Individual step in a multi-step form. */
export function GoabFormStep(props: GoabFormStepProps) {
  return <goa-form-step text={props.text} status={props.status} />;
}

export default GoabFormStep;
