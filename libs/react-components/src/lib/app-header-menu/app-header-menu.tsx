import { ReactNode } from "react";
import { GoabIconType } from "../../common/types";

interface WCProps {
  heading: string;
  leadingicon?: GoabIconType;
  testid?: string;
}

/* eslint-disable-next-line */
export interface GoabAppHeaderMenuProps {
  heading: string;
  leadingIcon?: GoabIconType;
  testId?: string;
  children?: ReactNode;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-app-header-menu": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export function GoabAppHeaderMenu(props: GoabAppHeaderMenuProps) {
  return (
    <goa-app-header-menu
      heading={props.heading}
      leadingicon={props.leadingIcon}
      testid={props.testId}
    >
      {props.children}
    </goa-app-header-menu>
  );
}

export default GoabAppHeaderMenu;
