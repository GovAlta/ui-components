import { ReactNode, type JSX } from "react";

interface WCProps {
  title: string;
  url: string;
  username: string;
  useremail: string;
  testid?: string;
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
  title: string;
  url: string;
  userName: string;
  userEmail: string;
  testId?: string;
  children?: ReactNode;
}

export function GoabWorkSideMenu(props: GoabWorkSideMenuProps): JSX.Element {
  return (
    <goa-work-side-menu
      title={props.title}
      url={props.url}
      username={props.userName}
      useremail={props.userEmail}
      testid={props.testId}
    >
      {props.children}
    </goa-work-side-menu>
  );
}

export default GoabWorkSideMenu;
