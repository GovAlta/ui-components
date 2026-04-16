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
  heading: string;
  icon?: GoabIconType;
  testId?: string;
  children?: ReactNode;
}

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
