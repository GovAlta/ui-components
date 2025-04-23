import { GoabTooltipHorizontalAlignment, GoabTooltipPosition, Margins } from "../../common/types";
import { ReactNode } from "react";

/* eslint-disable-next-line */
interface WCProps extends Margins {
  position?: GoabTooltipPosition;
  content?: string;
  testid?: string;
  halign?: GoabTooltipHorizontalAlignment;
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
export interface GoabTooltipProps extends Margins {
  position?: GoabTooltipPosition;
  content?: string;
  hAlign?: GoabTooltipHorizontalAlignment;
  testId?: string;
  children?: ReactNode;
}

export function GoabTooltip(props: GoabTooltipProps): JSX.Element {
  return (
    <goa-tooltip
      position={props.position}
      content={props.content}
      halign={props.hAlign}
      testid={props.testId}
      mt={props.mt}
      mr={props.mr}
      mb={props.mb}
      ml={props.ml}
    >
      {props.children}
    </goa-tooltip>
  );
}

export default GoabTooltip;
