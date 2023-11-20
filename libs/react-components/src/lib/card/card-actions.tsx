import { FC } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-actions": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoACardActionsProps {
  children?: React.ReactNode;
}

export const GoACardActions: FC<GoACardActionsProps> = ({ children }) => {
  return <goa-card-actions>{children}</goa-card-actions>;
};

export default GoACardActions;
