import { ReactNode } from "react";
import { Margins } from "../../common/styling";

// TODO: move these types into the common lib for the upcoming major release

type MaxWidth = string | "none";

interface WCProps extends Margins {
  as?: TextElement | HeadingElement;
  size?: Size;
  maxwidth?: MaxWidth;
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

export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5"
export type TextElement = "span" | "div" | "p";

type HeadingSize
  = "heading-xl"
  | "heading-l"
  | "heading-m"
  | "heading-s"
  | "heading-xs"

type BodySize
  = "body-l"
  | "body-m"
  | "body-s"
  | "body-xs";

export type Size = HeadingSize | BodySize;

interface GoATextProps extends Margins {
  as?: TextElement | HeadingElement;
  size?: Size;
  maxWidth?: MaxWidth;
  children: ReactNode;
}

export function GoAText(props: GoATextProps): JSX.Element {
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

export default GoAText;
