import { ReactNode } from "react";
import { GoabIconType, Margins } from "@abgov/ui-components-common";
import { DataGridProps, useDataGridProps } from "../common/data-props";

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
  const [dataGridProps, { leadingIcon, trailingIcon, action, actionArg, actionArgs, testId, mt, mb, ml, mr, children}] = useDataGridProps(props);

  return (
    <goa-link
      leadingicon={leadingIcon}
      trailingicon={trailingIcon}
      action={action}
      action-arg={actionArg}
      action-args={JSON.stringify(actionArgs)}
      testid={testId}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      {...dataGridProps}
    >
      {children}
    </goa-link>
  );
}

export default GoabLink;
