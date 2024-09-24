import { ReactNode } from "react";
import { Margins } from "../../common/styling";

interface WCProps extends Margins {
  heading: string;
  open?: boolean;
  maxwidth?: string;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-details": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoADetailsProps extends Margins {
  heading: string;
  open?: boolean;
  maxWidth?: string;
  testId?: string;
  children: ReactNode;
}

export type DetailsProps = GoADetailsProps;

export function GoADetails(props: GoADetailsProps) {
  return (
    <goa-details
      heading={props.heading}
      open={props.open}
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

export default GoADetails;
