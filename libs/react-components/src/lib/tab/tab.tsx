import type { JSX } from "react";
interface WCProps {
  heading?: React.ReactNode;
  disabled?: string;
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
  disabled?: boolean;
  children?: React.ReactNode;
}

export function GoabTab({ heading, disabled, children }: GoabTabItemProps): JSX.Element {
  return (
    <goa-tab disabled={disabled ? "true" : undefined}>
      {heading && <span slot="heading">{heading}</span>}
      {children}
    </goa-tab>
  );
}
