import { ReactNode } from "react";
import { GoAIconType } from "../icon/icon";

interface WCProps {
  heading: string;
  leadingicon?: GoAIconType;
  testid?: string;
}

/* eslint-disable-next-line */
export interface GoAAppHeaderMenuProps {
  heading: string;
  leadingIcon?: GoAIconType;
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

export function GoAAppHeaderMenu(props: GoAAppHeaderMenuProps) {
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

export default GoAAppHeaderMenu;
