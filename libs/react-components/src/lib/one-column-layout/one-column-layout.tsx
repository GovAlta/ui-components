import React, { ReactNode } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-one-column-layout": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface PageProps {
  children?: ReactNode;
}

export function GoAOneColumnLayout(props: PageProps) {
  return <goa-one-column-layout>{props.children}</goa-one-column-layout>;
}

export default GoAOneColumnLayout;
