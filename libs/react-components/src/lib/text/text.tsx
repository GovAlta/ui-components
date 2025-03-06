import { ReactNode, type JSX } from "react";
import {
  GoabTextMaxWidth,
  GoabTextHeadingElement,
  GoabTextTextElement,
  GoabTextSize,
  Margins,
} from "@abgov/ui-components-common";

interface WCProps extends Margins {
  as?: GoabTextTextElement | GoabTextHeadingElement;
  size?: GoabTextSize;
  maxwidth?: GoabTextMaxWidth;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-text": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}
interface GoATextProps extends Margins {
  as?: GoabTextTextElement | GoabTextHeadingElement;
  size?: GoabTextSize;
  maxWidth?: GoabTextMaxWidth;
  children: ReactNode;
}

export function GoabText(props: GoATextProps): JSX.Element {
  return (
    <goa-text
      as={props.as || "div"}
      size={props.size}
      maxwidth={props.maxWidth || "65ch"}
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
