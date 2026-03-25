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
export interface GoabxSideMenuProps {
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /** TO REVIEW: Navigation items rendered inside the side menu. */
  children: ReactNode;
  version?: string;
}

export function GoabxSideMenu({
  testId,
  children,
  version = "2",
}: GoabxSideMenuProps): JSX.Element {
  return (
    <goa-side-menu testid={testId} version={version}>
      {children}
    </goa-side-menu>
  );
}

export default GoabxSideMenu;
