import { ReactNode, type JSX } from "react";
import { GoabIconType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  heading: string;
  icon?: GoabIconType;
  testid?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-side-menu-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabSideMenuGroupProps extends Margins {
  /** @required The heading text for the menu group. */
  heading: string;
  /** Icon displayed alongside the heading. */
  icon?: GoabIconType;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Navigation links rendered inside the menu group. */
  children?: ReactNode;
}

/** Group of related side menu items. */
export function GoabSideMenuGroup({
  heading,
  icon,
  testId,
  children,
  mt,
  mr,
  mb,
  ml,
}: GoabSideMenuGroupProps): JSX.Element {
  return (
    <goa-side-menu-group
      heading={heading}
      icon={icon}
      testid={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      version="2"
    >
      {children}
    </goa-side-menu-group>
  );
}

export default GoabSideMenuGroup;
