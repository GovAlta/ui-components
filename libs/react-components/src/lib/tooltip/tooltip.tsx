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
  /**
   * Position with respect to the child element.
   * @default "top"
   */
  position?: GoabTooltipPosition;
  /**
   * The content of the tooltip.
   * @default ""
   */
  content?: string | ReactNode;
  /**
   * Horizontal alignment to the child element.
   * @default "center"
   */
  hAlign?: GoabTooltipHorizontalAlignment;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /**
   * Sets the maximum width of the tooltip. Must use 'px' unit.
   * @default ""
   */
  maxWidth?: string;
  /** TO DO: Write a description */
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
