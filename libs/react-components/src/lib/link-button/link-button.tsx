import { ReactNode } from "react";
import { DataAttributes, GoabIconType, GoabLinkButtonType, Margins } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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

interface GoALinkButtonProps extends Margins, DataAttributes {
  type?: GoabLinkButtonType;
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  children: ReactNode;
}

export function GoALinkButton({
  type = "primary",
  children,
  ...rest
}: GoALinkButtonProps) {
  const _props = transformProps<WCProps>(
    { type, ...rest },
    lowercase
  );

  return (
    <goa-link-button {..._props}>
      {children}
    </goa-link-button>
  );
}

export default GoALinkButton;
