import { ReactNode } from "react";
import { DataGridProps, GoabIconType, GoabLinkButtonType, Margins } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

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

interface GoALinkButtonProps extends Margins, DataGridProps {
  type?: GoabLinkButtonType;
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  children: ReactNode;
}

export function GoALinkButton({
  type = "primary",
  ...props
}: GoALinkButtonProps) {
  const _props = extractProps<WCProps>(
    { type, ...props },
    {
      attributeMapping: "lowercase",
    }
  );

  return (
    <goa-link-button {..._props}>
      {props.children}
    </goa-link-button>
  );
}

export default GoALinkButton;
