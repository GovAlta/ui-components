import React, { ReactNode } from "react";
import { Margins } from "../../common/styling";

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
interface PagesProps extends Margins {
  current?: number;
  children?: ReactNode;
}

export function GoAPages(props: PagesProps) {
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

export default GoAPages;
