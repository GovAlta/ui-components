import { ReactNode } from "react";
import { DataAttributes, GoabIconType } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  heading: string;
  leadingicon?: GoabIconType;
  testid?: string;
}

/* eslint-disable-next-line */
export interface GoabAppHeaderMenuProps extends DataAttributes {
  /**
   * The menu heading text displayed as the dropdown trigger.
   * @required
   */
  heading: string;
  /** Icon displayed before the heading text. */
  leadingIcon?: GoabIconType;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default "rootEl"
   */
  testId?: string;
  /** TO REVIEW: Menu items rendered inside the app header menu. */
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

export function GoabAppHeaderMenu({
  children,
  ...rest
}: GoabAppHeaderMenuProps) {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-app-header-menu {..._props}>
      {children}
    </goa-app-header-menu>
  );
}

export default GoabAppHeaderMenu;
