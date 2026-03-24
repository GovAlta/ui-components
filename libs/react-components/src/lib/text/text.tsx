import { ReactNode, type JSX } from "react";
import {
  GoabTextMaxWidth,
  GoabTextHeadingElement,
  GoabTextTextElement,
  GoabTextSize,
  GoabTextColor,
  Margins, DataAttributes,
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
  /** @deprecated Please use 'tag' property instead */
  as?: GoabTextTextElement | GoabTextHeadingElement;
  tag?: GoabTextTextElement | GoabTextHeadingElement;
  /** Overrides the text size. */
  size?: GoabTextSize;
  /**
   * Sets the max width.
   * @default "65ch"
   */
  maxWidth?: GoabTextMaxWidth;
  /**
   * Sets the text colour.
   * @default "primary"
   */
  color?: GoabTextColor;
  id?: string;
  children: ReactNode;
}

export function GoabText({
  as,
  tag,
  children,
  ...rest
}: GoATextProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-text
      as={tag || as}
      {..._props}
    >
      {children}
    </goa-text>
  );
}

export default GoabText;
