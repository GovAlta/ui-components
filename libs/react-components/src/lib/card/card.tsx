import React, { FC } from "react";

interface WCProps {
  elevation: number;
  children: React.ReactNode;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props {
  elevation: number;
  children?: React.ReactNode;
}

export const GoACard: FC<Props> = ({ elevation, children }) => {
  return <goa-card elevation={elevation}>{children}</goa-card>;
};

export default GoACard;
