import { ReactNode } from "react";

interface WCProps {
  navcolumnwidth?: string;
  maxcontentwidth?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-two-column-layout": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabTwoColumnLayoutProps {
  /** @required Content rendered in the page header slot. */
  header: ReactNode;
  /** @required Content rendered in the page footer slot. */
  footer: ReactNode;
  /** @required Content rendered in the navigation column slot. */
  nav: ReactNode;
  /** @required Main content rendered in the body of the layout. */
  children: ReactNode;
  /** Sets the width of the navigation column. */
  navColumnWidth?: string;
  /** Sets the maximum width of the content area. */
  maxContentWidth?: string;
}

export function GoabTwoColumnLayout(props: GoabTwoColumnLayoutProps) {
  return (
    <goa-two-column-layout
      navcolumnwidth={props.navColumnWidth}
      maxcontentwidth={props.maxContentWidth}
    >
      {props.header && <div slot="header">{props.header}</div>}
      {props.nav && <div slot="nav">{props.nav}</div>}
      {props.children}
      {props.footer && <div slot="footer">{props.footer}</div>}
    </goa-two-column-layout>
  );
}

export default GoabTwoColumnLayout;
