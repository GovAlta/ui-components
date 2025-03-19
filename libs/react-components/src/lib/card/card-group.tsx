import type { JSX } from "react";
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-group": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardGroupProps {
  children?: React.ReactNode;
}

export function GoabCardGroup({ children }: GoabCardGroupProps): JSX.Element {
  return <goa-card-group>{children}</goa-card-group>;
}

export default GoabCardGroup;
