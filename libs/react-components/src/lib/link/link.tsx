import { ReactNode } from "react";
import { GoabIconType } from "@abgov/ui-components-common";
import { Margins } from "../../common/types";

interface WCProps extends Margins {
  leadingicon?: GoabIconType;
  trailingicon?: GoabIconType;
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
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
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
