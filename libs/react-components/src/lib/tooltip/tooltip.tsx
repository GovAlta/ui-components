import {
  GoabTooltipHorizontalAlignment,
  GoabTooltipPosition,
  Margins,
} from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

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
export interface GoabTooltipProps extends Margins, DataGridProps {
  position?: GoabTooltipPosition;
  content?: string | ReactNode;
  hAlign?: GoabTooltipHorizontalAlignment;
  testId?: string;
  maxWidth?: string;
  children?: ReactNode;
}

export function GoabTooltip(props: GoabTooltipProps): JSX.Element {
  const [dataGridProps,{ position, content, hAlign, testId, maxWidth, mt, mr, mb, ml, children}] = useDataGridProps(props);
  const isStringContent = typeof content === "string";

  return (
    <goa-tooltip
      position={position}
      content={isStringContent ? (content as string) : undefined}
      halign={hAlign}
      testid={testId}
      maxwidth={maxWidth}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      {...dataGridProps}
    >
      {!isStringContent && content && <div slot="content">{content}</div>}
      {children}
    </goa-tooltip>
  );
}

export default GoabTooltip;
