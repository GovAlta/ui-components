import { FC } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-group": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoACardGroupProps {
  children?: React.ReactNode;
}

export const GoACardGroup: FC<GoACardGroupProps> = ({ children }) => {
  return <goa-card-group>{children}</goa-card-group>;
};

export default GoACardGroup;
