import { ReactNode } from "react";
import { Margins } from "../../common/styling";
import { GoAIconType } from "../icon/icon";

// TODO: move these types into the common lib for the upcoming major release

interface WCProps extends Margins {
  leadingicon?: GoAIconType;
  trailingicon?: GoAIconType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-link": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoALinkProps extends Margins {
  leadingIcon?: GoAIconType;
  trailingIcon?: GoAIconType;
  children: ReactNode;
}

export function GoALink(props: GoALinkProps) {
  return (
    <goa-link
      leadingicon={props.leadingIcon}
      trailingicon={props.trailingIcon}
      mt={props.mt}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}
    >
      {props.children}
    </goa-link>
  );
}

export default GoALink;
