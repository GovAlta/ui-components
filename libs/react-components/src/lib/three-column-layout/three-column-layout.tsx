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
  /** Main content rendered in the center column. */
  children: ReactNode;
  /** Sets the width of the left column. */
  leftColumnWidth?: string;
  /** Sets the width of the right column. */
  rightColumnWidth?: string;
  /** Sets the maximum width of the content area. */
  maxContentWidth?: string;
  /** Content rendered in the page header slot. */
  header?: ReactNode;
  /** Content rendered in the page footer slot. */
  footer?: ReactNode;
  /** Content rendered in the navigation slot. */
  nav?: ReactNode;
  /** @deprecated Use sideMenu instead. Content rendered in the side menu slot. */
  sidebar?: ReactNode;
  /** Content rendered in the side menu slot. */
  sideMenu?: ReactNode;
}

/** Organizes page content in three responsive columns. */
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
