import { Margins } from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";

interface WCProps extends Margins {
  current?: number;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-pages": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabPagesProps extends Margins {
  /** The currently visible page (1-based index). @default 1 */
  current?: number;
  /** Page content to show or hide based on the current page index. */
  children?: ReactNode;
}

export function GoabPages(props: GoabPagesProps): JSX.Element {
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

export default GoabPages;
