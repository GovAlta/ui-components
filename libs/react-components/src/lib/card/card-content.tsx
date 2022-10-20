import React, { FC } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-content": React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props {
  children?: React.ReactNode;
}

export const GoACardContent: FC<Props> = ({ children }) => {
  return <goa-card-content>{children}</goa-card-content>;
};

export default GoACardContent;
