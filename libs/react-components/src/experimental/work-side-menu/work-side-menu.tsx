import { ReactNode, type JSX } from "react";

interface WCProps {
  heading: string;
  url: string;
  userName: string;
  userSecondaryText: string;
  testid?: string;
  primaryContent?: ReactNode;
  secondaryContent?: ReactNode;
  accountContent?: ReactNode;
}
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-work-side-menu": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabWorkSideMenuProps {
  heading: string;
  url: string;
  userName: string;
  userSecondaryText: string;
  testId?: string;
  primaryContent?: ReactNode;
  secondaryContent?: ReactNode;
  accountContent?: ReactNode;
}

export function GoaxWorkSideMenu({
  heading,
  url,
  userName,
  userSecondaryText,
  testId,
  primaryContent,
  secondaryContent,
  accountContent,
}: GoabWorkSideMenuProps): JSX.Element {
  return (
    <goa-work-side-menu
      heading={heading}
      url={url}
      userName={userName}
      userSecondaryText={userSecondaryText}
      testid={testId}
    >
      {primaryContent && <div slot="primary">{primaryContent}</div>}
      {secondaryContent && <div slot="secondary">{secondaryContent}</div>}
      {accountContent && <div slot="account">{accountContent}</div>}
    </goa-work-side-menu>
  );
}

export default GoaxWorkSideMenu;
