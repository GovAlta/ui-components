interface WCProps {
  heading?: React.ReactNode;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-tab": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABTabItemProps {
  heading?: React.ReactNode;
  children?: React.ReactNode;
}

export function GoABTab({ heading, children }: GoABTabItemProps): JSX.Element {
  return (
    <goa-tab>
      {heading && <span slot="heading">{heading}</span>}
      {children}
    </goa-tab>
  );
}
