import { ReactNode, type JSX } from "react";
import {
  GoabTextMaxWidth,
  GoabTextHeadingElement,
  GoabTextTextElement,
  GoabTextSize,
  GoabTextColor,
  Margins,
} from "@abgov/ui-components-common";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps extends Margins {
  as?: GoabTextTextElement | GoabTextHeadingElement;
  size?: GoabTextSize;
  maxwidth?: GoabTextMaxWidth;
  color?: GoabTextColor;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-text": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoATextProps extends Margins, DataGridProps {
  /** @deprecated Please use 'tag' property instead */
  as?: GoabTextTextElement | GoabTextHeadingElement;
  tag?: GoabTextTextElement | GoabTextHeadingElement;
  size?: GoabTextSize;
  maxWidth?: GoabTextMaxWidth;
  color?: GoabTextColor;
  children: ReactNode;
}

export function GoabText(props: GoATextProps): JSX.Element {
  const [dataGridProps,{ as, tag, size, maxWidth, color, mt, mb, ml, mr, children }] = useDataGridProps(props);

  return (
    <goa-text
      as={tag || as}
      size={size}
      maxwidth={maxWidth}
      color={color}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      version={"2"}
      {...dataGridProps}
    >
      {children}
    </goa-text>
  );
}

export default GoabText;
