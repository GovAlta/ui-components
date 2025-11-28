import { ReactNode } from "react";
import { GoabIconType, Margins, DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps extends Margins {
  leadingicon?: GoabIconType;
  trailingicon?: GoabIconType;
  action?: string;
  actionArgs?: string;
  actionArg?: string;
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

interface GoabLinkProps extends Margins, DataGridProps {
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  action?: string;
  actionArgs?: Record<string, unknown>;
  actionArg?: string;
  testId?: string;
  children: ReactNode;
}

export function GoabLink(props: GoabLinkProps) {
  const _props = extractProps<WCProps>(props, {
    exclude: ["actionArgs", "actionArg"],
    attributeMapping: "lowercase",
  });

  return (
    <goa-link
      action-arg={props.actionArg}
      action-args={JSON.stringify(props.actionArgs)}
      {..._props}
    >
      {props.children}
    </goa-link>
  );
}

export default GoabLink;
