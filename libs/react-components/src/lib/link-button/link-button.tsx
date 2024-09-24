import { ReactNode } from "react";
import { Margins } from "../../common/styling";
import { GoAIconType } from "../icon/icon";

// TODO: move these types into the common lib for the upcoming major release

export type GoALinkButtonType = "start" | "primary" | "secondary" | "tertiary";

interface WCProps extends Margins {
  type?: GoALinkButtonType;
  leadingicon?: GoAIconType;
  trailingicon?: GoAIconType;
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
  leadingIcon?: GoAIconType;
  trailingIcon?: GoAIconType;
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
