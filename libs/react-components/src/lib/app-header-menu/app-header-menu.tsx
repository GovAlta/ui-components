import { ReactNode } from "react";
import { GoabIconType } from "@abgov/ui-components-common";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps {
  heading: string;
  leadingicon?: GoabIconType;
  testid?: string;
}

/* eslint-disable-next-line */
export interface GoabAppHeaderMenuProps extends DataGridProps {
  heading: string;
  leadingIcon?: GoabIconType;
  testId?: string;
  children?: ReactNode;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-header-menu": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export function GoabAppHeaderMenu(props: GoabAppHeaderMenuProps) {
  const [dataGridProps, { heading, leadingIcon, testId, children }] = useDataGridProps(props);
  return (
    <goa-app-header-menu
      heading={heading}
      leadingicon={leadingIcon}
      testid={testId}
      {...dataGridProps}
    >
      {children}
    </goa-app-header-menu>
  );
}

export default GoabAppHeaderMenu;
