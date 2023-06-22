import React, { FC } from "react";

interface WCProps {
  heading?: React.ReactNode;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-tab": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface TabItemProps {
  heading?: React.ReactNode;
  children?: React.ReactNode;
}

export const GoATab: FC<TabItemProps> = ({ heading, children }) => {
  return (
    <goa-tab>
      {heading && <span slot="heading">{heading}</span>}
      {children}
    </goa-tab>
  );
};
