import { FC } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-actions": React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props {
  children?: React.ReactNode;
}

export const GoACardActions: FC<Props> = ({ children }) => {
  return <goa-card-actions>{children}</goa-card-actions>;
};

export default GoACardActions;
