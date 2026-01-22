import { ReactNode } from "react";
import { GoabIconType, Margins, DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  leadingicon?: GoabIconType;
  trailingicon?: GoabIconType;
  action?: string;
  actionArgs?: string;
  actionArg?: string;
  testid?: string;
}

interface GoabLinkProps extends Margins, DataAttributes {
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  action?: string;
  actionArgs?: Record<string, unknown>;
  actionArg?: string;
  testId?: string;
  children: ReactNode;
}

export function GoabLink({
  actionArgs,
  actionArg,
  children,
  ...rest
}: GoabLinkProps) {
  const _props = transformProps<WCProps>(rest, lowercase);

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
