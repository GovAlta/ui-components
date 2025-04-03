import { ReactNode } from "react";
import { GoabIconType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  leadingicon?: GoabIconType;
  trailingicon?: GoabIconType;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-link": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoabLinkProps extends Margins {
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  testId?: string;
  children: ReactNode;
}

export function GoabLink(props: GoabLinkProps) {
  return (
    <goa-link
      leadingicon={props.leadingIcon}
      trailingicon={props.trailingIcon}
      testid={props.testId}
      mt={props.mt}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}
    >
      {props.children}
    </goa-link>
  );
}

export default GoabLink;
