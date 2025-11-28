import { ReactNode } from "react";
import { DataGridProps, GoabIconType } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

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
  const _props = extractProps<WCProps>(props, {
    attributeMapping: "lowercase",
  });

  return (
    <goa-app-header-menu {..._props}>
      {props.children}
    </goa-app-header-menu>
  );
}

export default GoabAppHeaderMenu;
