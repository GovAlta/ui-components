import {
  GoabTooltipHorizontalAlignment,
  GoabTooltipPosition,
  Margins,
} from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";

/* eslint-disable-next-line */
interface WCProps extends Margins {
  position?: GoabTooltipPosition;
  content?: string;
  testid?: string;
  halign?: GoabTooltipHorizontalAlignment;
  maxwidth?: string;
}

declare module "react" {
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
  content?: string | ReactNode;
  hAlign?: GoabTooltipHorizontalAlignment;
  testId?: string;
  maxWidth?: string;
  children?: ReactNode;
}

export function GoabTooltip(props: GoabTooltipProps): JSX.Element {
  const isStringContent = typeof props.content === "string";

  return (
    <goa-tooltip
      position={props.position}
      content={isStringContent ? (props.content as string) : undefined}
      halign={props.hAlign}
      testid={props.testId}
      maxwidth={props.maxWidth}
      mt={props.mt}
      mr={props.mr}
      mb={props.mb}
      ml={props.ml}
    >
      {!isStringContent && props.content && <div slot="content">{props.content}</div>}
      {props.children}
    </goa-tooltip>
  );
}

export default GoabTooltip;
