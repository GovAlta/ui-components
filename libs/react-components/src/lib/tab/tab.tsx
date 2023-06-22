import React, { FC } from "react";

interface WCProps {
  open?: boolean;
  heading?: string | React.ReactNode;
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
  open?: boolean;
  heading?: string | React.ReactNode;
}

export const GoATab: FC<TabItemProps> = ({ open, heading, children }) => {
  return (
    <goa-tab open={open}>
      {heading && <span slot="heading">{heading}</span>}
      {children}
    </goa-tab>
  );
};
