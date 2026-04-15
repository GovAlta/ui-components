import {
  GoabTooltipHorizontalAlignment,
  GoabTooltipPosition,
  Margins, DataAttributes,
} from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

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
export interface GoabTooltipProps extends Margins, DataAttributes {
  position?: GoabTooltipPosition;
  content?: string | ReactNode;
  hAlign?: GoabTooltipHorizontalAlignment;
  testId?: string;
  maxWidth?: string;
  children?: ReactNode;
}

export function GoabTooltip({
  content,
  children,
  ...rest
}: GoabTooltipProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  const isStringContent = typeof content === "string";

  return (
    <goa-tooltip
      content={isStringContent ? (content as string) : undefined}
      {..._props}
    >
      {!isStringContent && content && <div slot="content">{content}</div>}
      {children}
    </goa-tooltip>
  );
}

export default GoabTooltip;
