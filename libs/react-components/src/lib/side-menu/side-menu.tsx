import { ReactNode, type JSX } from "react";

interface WCProps {
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-side-menu": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabSideMenuProps {
  testId?: string;
  children: ReactNode;
}

export function GoabSideMenu(props: GoabSideMenuProps): JSX.Element {
  return <goa-side-menu testid={props.testId}>{props.children}</goa-side-menu>;
}

export default GoabSideMenu;
