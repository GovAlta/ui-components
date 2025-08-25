import { Margins } from "@abgov/ui-components-common";
import { ReactNode } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

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
export interface GoabDetailsProps extends Margins, DataGridProps {
  heading: string;
  open?: boolean;
  maxWidth?: string;
  testId?: string;
  children: ReactNode;
}

export function GoabDetails(props: GoabDetailsProps) {
  const [dataGridProps, { heading, open, maxWidth, testId, mt, mr, mb, ml, children }] = useDataGridProps(props);
  return (
    <goa-details
      heading={heading}
      open={open ? "true" : undefined}
      maxwidth={maxWidth}
      testid={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      {...dataGridProps}
    >
      {children}
    </goa-details>
  );
}

export default GoabDetails;
