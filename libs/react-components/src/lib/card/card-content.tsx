declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-content": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABCardContentProps {
  children?: React.ReactNode;
}

export function GoABCardContent({ children }: GoABCardContentProps): JSX.Element {
  return <goa-card-content>{children}</goa-card-content>;
}

export default GoABCardContent;
