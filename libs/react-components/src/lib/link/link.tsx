import { ReactNode } from "react";
import {
  GoabIconType,
  GoabLinkColor,
  GoabLinkSize,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  leadingicon?: GoabIconType;
  trailingicon?: GoabIconType;
  action?: string;
  actionArgs?: string;
  actionArg?: string;
  testid?: string;
  color?: GoabLinkColor;
  size?: GoabLinkSize;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-link": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabLinkProps extends Margins, DataAttributes {
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  action?: string;
  actionArgs?: Record<string, unknown>;
  actionArg?: string;
  color?: GoabLinkColor;
  size?: GoabLinkSize;
  testId?: string;
  children: ReactNode;
}

export function GoabLink({
  actionArgs,
  actionArg,
  color = "interactive",
  size = "medium",
  children,
  ...rest
}: GoabLinkProps) {
  const _props = transformProps<WCProps>({ color, size, ...rest }, lowercase);

  return (
    <goa-link
      action-arg={actionArg}
      action-args={JSON.stringify(actionArgs)}
      {..._props}
    >
      {children}
    </goa-link>
  );
}

export default GoabLink;
