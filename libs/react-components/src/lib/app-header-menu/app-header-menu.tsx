import { ReactNode } from "react";
import { DataAttributes, GoabIconType } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  heading: string;
  leadingicon?: GoabIconType;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-header-menu": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabAppHeaderMenuProps extends DataAttributes {
  heading: string;
  leadingIcon?: GoabIconType;
  testId?: string;
  slotName?: string;
  children?: ReactNode;
}

export function GoabAppHeaderMenu({
  children,
  slotName,
  ...rest
}: GoabAppHeaderMenuProps) {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-app-header-menu slot={slotName} {..._props}>
      {children}
    </goa-app-header-menu>
  );
}

export default GoabAppHeaderMenu;
