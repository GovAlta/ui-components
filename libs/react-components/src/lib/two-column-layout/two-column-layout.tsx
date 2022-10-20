import React, { ReactNode } from "react";

interface WCProps {
  navcolumnwidth?: string;
  maxcontentwidth?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-two-column-layout": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props {
  navColumnWidth?: string;
  maxContentWidth?: string;
  header: ReactNode;
  footer: ReactNode;
  nav: ReactNode;
  children: ReactNode;
}

export function GoATwoColumnLayout(props: Props) {
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

export default GoATwoColumnLayout;
