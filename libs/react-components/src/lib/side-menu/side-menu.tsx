import { ReactNode, type JSX } from "react";

interface WCProps {
  testid?: string;
  version?: string;
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
  /** @required Navigation links and groups rendered inside the side menu. */
  children: ReactNode;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

export function GoabSideMenu({ testId, children }: GoabSideMenuProps): JSX.Element {
  return (
    <goa-side-menu testid={testId} version="2">
      {children}
    </goa-side-menu>
  );
}

export default GoabSideMenu;
