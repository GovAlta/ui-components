import { ReactNode, type JSX } from "react";
import {
  GoabTextMaxWidth,
  GoabTextHeadingElement,
  GoabTextTextElement,
  GoabTextSize,
  GoabTextColor,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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

interface GoATextProps extends Margins, DataAttributes {
  /** Content rendered inside the text element. */
  children: ReactNode;
  /** @deprecated Please use 'tag' property instead */
  as?: GoabTextTextElement | GoabTextHeadingElement;
  /** The HTML element to render. Use semantic elements like 'h1'-'h6' for headings. */
  tag?: GoabTextTextElement | GoabTextHeadingElement;
  /** Overrides the text size. */
  size?: GoabTextSize;
  /** Sets the max width. @default "65ch" */
  maxWidth?: GoabTextMaxWidth;
  /** Sets the text colour. @default "primary" */
  color?: GoabTextColor;
  /** Sets the id attribute on the element. */
  id?: string;
}

export function GoabText({ as, tag, children, ...rest }: GoATextProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-text as={tag || as} {..._props}>
      {children}
    </goa-text>
  );
}

export default GoabText;
