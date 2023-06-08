import React from "react";
import { Margins } from "../../common/styling";

/* eslint-disable-next-line */
interface WCProps extends Margins {
  position?: string;
  content?: string;
  halign?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-tooltip": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
interface TooltipProps extends Margins {
  position?: string;
  content?: string;
  hAlign?: string;
  testId?: string;
}

export const GoATooltip: React.FC<TooltipProps> = (props) => {
  return (
    <goa-tooltip
      position={props.position}
      content={props.content}
      halign={props.hAlign}
      data-testid={props.testId}
      mt={props.mt}
      mr={props.mr}
      mb={props.mb}
      ml={props.ml}
    >
      {props.children}
    </goa-tooltip>
  );
};

export default GoATooltip;
