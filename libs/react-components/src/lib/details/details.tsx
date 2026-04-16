import { Margins, DataAttributes } from "@abgov/ui-components-common";
import { ReactNode } from "react";
import { transformProps, lowercase } from "../common/extract-props";

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
export interface GoabDetailsProps extends Margins, DataAttributes {
  heading: string;
  open?: boolean;
  maxWidth?: string;
  testId?: string;
  children: ReactNode;
}

export function GoabDetails({
  open,
  children,
  ...rest
}: GoabDetailsProps) {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-details
      open={open ? "true" : undefined}
      {..._props}
    >
      {children}
    </goa-details>
  );
}

export default GoabDetails;
