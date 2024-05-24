import { ABGovTooltipHorizontalAlignment, ABGovTooltipPosition, Margins } from "@abgov/ui-components-common";
import { ReactNode } from "react";

/* eslint-disable-next-line */
interface WCProps extends Margins {
  position?: ABGovTooltipPosition;
  content?: string;
  halign?: ABGovTooltipHorizontalAlignment;
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
export interface ABGovTooltipProps extends Margins {
  position?: ABGovTooltipPosition;
  content?: string;
  hAlign?: ABGovTooltipHorizontalAlignment;
  testId?: string;
  children?: ReactNode;
}

export function ABGovTooltip(props: ABGovTooltipProps): JSX.Element {
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
}

export default ABGovTooltip;
