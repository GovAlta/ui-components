import React, { useEffect, useRef } from "react";

interface WCProps {
  initialtab?: number;
}
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-tabs": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface TabsProps {
  initialTab?: number;
  children?: React.ReactNode;
}

export function GoATabs({ initialTab, children }: TabsProps) {
  return <goa-tabs initialtab={initialTab}>{children}</goa-tabs>;
}

export default GoATabs;
