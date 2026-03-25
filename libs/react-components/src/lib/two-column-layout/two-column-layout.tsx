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
  /** TO DO: Write a description */
  header: ReactNode;
  /** TO DO: Write a description */
  footer: ReactNode;
  /** TO DO: Write a description */
  nav: ReactNode;
  /** TO DO: Write a description */
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
