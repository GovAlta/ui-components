import { ReactNode } from "react";
import { GoabIconType, Margins } from "@abgov/ui-components-common";

// TODO: move these types into the common lib for the upcoming major release

export type GoALinkButtonType = "start" | "primary" | "secondary" | "tertiary";

interface WCProps extends Margins {
  type?: GoALinkButtonType;
  leadingicon?: GoabIconType;
  trailingicon?: GoabIconType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-link-button": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoALinkButtonProps extends Margins {
  type?: GoALinkButtonType;
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  children: ReactNode;
}

export function GoALinkButton(
  { type = "primary", ...props }: GoALinkButtonProps,
) {
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
