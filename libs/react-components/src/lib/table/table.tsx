import React, { ReactNode } from "react";
import { Margins } from "../../common/styling";

export type TableVariant = "normal" | "relaxed";

interface WCProps extends Margins {
  width?: string;
  stickyheader?: boolean;
  variant?: TableVariant;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-table": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface TableProps extends Margins {
  width?: string;
  // stickyHeader?: boolean; TODO: enable this later
  variant?: TableVariant;
  children: ReactNode;
}

export function GoATable(props: TableProps) {
  return (
    <goa-table
      width={props.width}
      stickyheader={false}
      mt={props.mt}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}
    >
      <template>
        <table>{props.children}</table>
      </template>
    </goa-table>
  );
}

export default GoATable;
