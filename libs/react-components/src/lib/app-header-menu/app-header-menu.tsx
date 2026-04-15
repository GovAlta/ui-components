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
  /** @required The menu heading text displayed as the dropdown trigger. */
  heading: string;
  /** Icon displayed before the heading text. */
  leadingIcon?: GoabIconType;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Slot name used to place this menu in the correct slot of the parent component. */
  slotName?: string;
  /** Content rendered inside the menu dropdown, typically navigation links. */
  children?: ReactNode;
}

/** Menu items within the app header. */
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
