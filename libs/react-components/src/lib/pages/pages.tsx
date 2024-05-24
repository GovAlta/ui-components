import { Margins } from "@abgov/ui-components-common";
import { ReactNode } from "react";

interface WCProps extends Margins {
  current?: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-pages": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoABPagesProps extends Margins {
  current?: number;
  children?: ReactNode;
}

export function GoABPages(props: GoABPagesProps): JSX.Element {
  return (
    <goa-pages
      current={props.current}
      ml={props.ml}
      mr={props.mr}
      mt={props.mt}
      mb={props.mb}
    >
      {props.children}
    </goa-pages>
  );
}

export default GoABPages;
