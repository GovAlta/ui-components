import { FC } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-content": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoACardContentProps {
  children?: React.ReactNode;
}

export const GoACardContent: FC<GoACardContentProps> = ({ children }) => {
  return <goa-card-content>{children}</goa-card-content>;
};

export default GoACardContent;
