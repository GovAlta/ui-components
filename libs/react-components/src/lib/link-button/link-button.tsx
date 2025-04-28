import { ReactNode } from "react";
import { GoabIconType, GoabLinkButtonType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  type?: GoabLinkButtonType;
  leadingicon?: GoabIconType;
  trailingicon?: GoabIconType;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-link-button": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoALinkButtonProps extends Margins {
  type?: GoabLinkButtonType;
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  children: ReactNode;
}

export function GoALinkButton({ type = "primary", ...props }: GoALinkButtonProps) {
  return (
    <goa-link-button
      type={type}
      leadingicon={props.leadingIcon}
      trailingicon={props.trailingIcon}
      mt={props.mt}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}
    >
      {props.children}
    </goa-link-button>
  );
}

export default GoALinkButton;
