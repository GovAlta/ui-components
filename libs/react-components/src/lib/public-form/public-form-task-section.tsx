import { ReactNode, type JSX } from "react";
import { Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  heading?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form-task-section": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabPublicFormTaskSectionProps extends Margins {
  /** Section heading shown at the top of the card, e.g. "1. Before you start". */
  heading?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** The task rows. */
  children?: ReactNode;
}

/** A bordered card grouping a titled set of task rows on the task list. */
export function GoabPublicFormTaskSection({
  heading,
  testId,
  mt,
  mr,
  mb,
  ml,
  children,
}: GoabPublicFormTaskSectionProps): JSX.Element {
  return (
    <goa-public-form-task-section
      heading={heading}
      testid={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-public-form-task-section>
  );
}

export default GoabPublicFormTaskSection;
