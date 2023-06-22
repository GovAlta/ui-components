import React from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-tabs": React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface TabsProps {
  children?: React.ReactNode;
}

export function GoATabs({ children }: TabsProps) {
  return <goa-tabs>{children}</goa-tabs>;
}

export default GoATabs;
