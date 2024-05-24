declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-group": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABCardGroupProps {
  children?: React.ReactNode;
}

export function GoABCardGroup({ children }: GoABCardGroupProps): JSX.Element {
  return <goa-card-group>{children}</goa-card-group>;
}

export default GoABCardGroup;
