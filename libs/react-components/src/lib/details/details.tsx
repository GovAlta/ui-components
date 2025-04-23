import { Margins } from "@abgov/ui-components-common";
import { ReactNode } from "react";

interface WCProps extends Margins {
  heading: string;
  open?: string;
  maxwidth?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-details": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabDetailsProps extends Margins {
  heading: string;
  open?: boolean;
  maxWidth?: string;
  testId?: string;
  children: ReactNode;
}

export function GoabDetails(props: GoabDetailsProps) {
  return (
    <goa-details
      heading={props.heading}
      open={props.open ? "true" : undefined}
      maxwidth={props.maxWidth}
      testid={props.testId}
      mt={props.mt}
      mr={props.mr}
      mb={props.mb}
      ml={props.ml}
    >
      {props.children}
    </goa-details>
  );
}

export default GoabDetails;
