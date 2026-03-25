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
  /** TO REVIEW: Content rendered in the header slot of the layout. */
  header?: ReactNode;
  /** TO REVIEW: Content rendered in the footer slot of the layout. */
  footer?: ReactNode;
  /** TO REVIEW: Content rendered in the navigation slot of the layout. */
  nav?: ReactNode;
  /** TO REVIEW: Content rendered in the sidebar slot of the layout. */
  sidebar?: ReactNode; // DEPRECATED
  /** TO REVIEW: Content rendered in the side menu slot of the layout. */
  sideMenu?: ReactNode;
  /**
   * TO REVIEW: The main content rendered in the center column of the layout.
   * @required
   */
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
