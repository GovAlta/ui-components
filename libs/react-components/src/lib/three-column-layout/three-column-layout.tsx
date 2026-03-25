import { ReactNode } from "react";

interface WCProps {
  leftcolumnwidth?: string;
  maxcontentwidth?: string;
  rightcolumnwidth?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-three-column-layout": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabThreeColumnLayoutProps {
  leftColumnWidth?: string;
  rightColumnWidth?: string;
  maxContentWidth?: string;
  /** TO DO: Write a description */
  header?: ReactNode;
  /** TO DO: Write a description */
  footer?: ReactNode;
  /** TO DO: Write a description */
  nav?: ReactNode;
  /** TO DO: Write a description */
  sidebar?: ReactNode; // DEPRECATED
  /** TO DO: Write a description */
  sideMenu?: ReactNode;
  /** TO DO: Write a description */
  children: ReactNode;
}

export function GoabThreeColumnLayout(props: GoabThreeColumnLayoutProps) {
  return (
    <goa-three-column-layout
      leftcolumnwidth={props.leftColumnWidth}
      rightcolumnwidth={props.rightColumnWidth}
      maxcontentwidth={props.maxContentWidth}
    >
      {props.header && <div slot="header">{props.header}</div>}
      {props.nav && <div slot="nav">{props.nav}</div>}
      {props.sidebar && <div slot="side-menu">{props.sidebar}</div>}
      {props.sideMenu && <div slot="side-menu">{props.sideMenu}</div>}
      {props.children}
      {props.footer && <div slot="footer">{props.footer}</div>}
    </goa-three-column-layout>
  );
}

export default GoabThreeColumnLayout;
