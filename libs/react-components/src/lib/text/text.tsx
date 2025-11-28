import { ReactNode, type JSX } from "react";
import {
  GoabTextMaxWidth,
  GoabTextHeadingElement,
  GoabTextTextElement,
  GoabTextSize,
  GoabTextColor,
  Margins, DataGridProps,
} from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps extends Margins {
  as?: GoabTextTextElement | GoabTextHeadingElement;
  size?: GoabTextSize;
  maxwidth?: GoabTextMaxWidth;
  color?: GoabTextColor;
  id?: string;
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
  id?: string;
  children: ReactNode;
}

export function GoabText(props: GoATextProps): JSX.Element {
  const _props = extractProps<WCProps>(props, {
    exclude: ["as", "tag"],
  });

  return (
    <goa-text
      as={props.tag || props.as}
      {..._props}
    >
      {props.children}
    </goa-text>
  );
}

export default GoabText;
