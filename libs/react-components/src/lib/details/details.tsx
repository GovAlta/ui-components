import React, { ReactNode } from "react";
import { Margins } from "../../common/styling";

interface WCProps extends Margins {
  heading: string;
  open?: boolean;
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
export interface DetailsProps extends Margins {
  heading: string;
  open?: boolean;
  children: ReactNode;
}

export function GoADetails(props: DetailsProps) {
  return (
    <goa-details
      heading={props.heading}
      open={props.open}
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
