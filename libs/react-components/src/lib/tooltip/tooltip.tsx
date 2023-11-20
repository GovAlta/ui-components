import React, { ReactNode } from "react";
import { Margins } from "../../common/styling";

export type GoATooltipPosition = "top" | "bottom" | "left" | "right";
export type GoATooltipHorizontalAlignment = "left" | "right" | "center";

/* eslint-disable-next-line */
interface WCProps extends Margins {
  position?: GoATooltipPosition;
  content?: string;
  halign?: GoATooltipHorizontalAlignment;
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
export interface GoATooltipProps extends Margins {
  position?: GoATooltipPosition;
  content?: string;
  hAlign?: GoATooltipHorizontalAlignment;
  testId?: string;
  children?: ReactNode;
}

export const GoATooltip: React.FC<GoATooltipProps> = (props) => {
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
