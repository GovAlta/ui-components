import type { JSX } from "react";
interface WCProps {
  heading?: React.ReactNode;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-tab": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabTabItemProps {
  heading?: React.ReactNode;
  children?: React.ReactNode;
}

export function GoabTab({ heading, children }: GoabTabItemProps): JSX.Element {
  return (
    <goa-tab version={"2"}>
      {heading && <span slot="heading">{heading}</span>}
      {children}
    </goa-tab>
  );
}
