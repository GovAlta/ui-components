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

export function GoACardGroup({ children }: GoACardGroupProps): JSX.Element {
  return <goa-card-group>{children}</goa-card-group>;
};

export default GoACardGroup;
