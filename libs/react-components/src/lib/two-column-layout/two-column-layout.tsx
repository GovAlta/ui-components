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
  navColumnWidth?: string;
  maxContentWidth?: string;
  /** TO REVIEW: Content rendered in the header slot of the layout. */
  header: ReactNode;
  /** TO REVIEW: Content rendered in the footer slot of the layout. */
  footer: ReactNode;
  /** TO REVIEW: Content rendered in the navigation slot of the layout. */
  nav: ReactNode;
  /** TO REVIEW: The main content rendered in the primary column of the layout. */
  children: ReactNode;
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
