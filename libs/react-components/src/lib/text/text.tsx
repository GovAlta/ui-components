import { ReactNode } from "react";
import {
  GoabTextMaxWidth,
  GoabTextHeadingElement,
  GoabTextTextElement,
  GoabTextSize,
  GoabTextColor,
  Margins
} from "../../common/types";

interface WCProps extends Margins {
  as?: GoabTextTextElement | GoabTextHeadingElement;
  size?: GoabTextSize;
  maxwidth?: GoabTextMaxWidth;
  color?: GoabTextColor;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-text": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoATextProps extends Margins {
  /** @deprecated Please use 'tag' property instead */
  as?: GoabTextTextElement | GoabTextHeadingElement;
  tag?: GoabTextTextElement | GoabTextHeadingElement;
  size?: GoabTextSize;
  maxWidth?: GoabTextMaxWidth;
  color?: GoabTextColor;
  children: ReactNode;
}

export function GoabText(props: GoATextProps): JSX.Element {
  return (
    <goa-text
      as={props.as || props.tag}
      size={props.size}
      maxwidth={props.maxWidth}
      color={props.color}
      mt={props.mt}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}
    >
      {props.children}
    </goa-text>
  );
}

export default GoabText;
