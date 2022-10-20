import React, { FC } from "react";

interface WCProps {
  children: React.ReactNode;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props {
  children?: React.ReactNode;
}

export const GoACardGroup: FC<Props> = ({ children }) => {
  return <goa-card-group>{children}</goa-card-group>;
};

export default GoACardGroup;
