import { Margins, DataGridProps } from "@abgov/ui-components-common";
import { ReactNode } from "react";
import { extractProps } from "../common/extract-props";

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
  const _props = extractProps<WCProps>(props, {
    exclude: ["open"],
    attributeMapping: "lowercase",
  });

  return (
    <goa-details
      open={props.open ? "true" : undefined}
      {..._props}
    >
      {props.children}
    </goa-details>
  );
}

export default GoabDetails;
