declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-content": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardContentProps {
  children?: React.ReactNode;
}

export function GoabCardContent({ children }: GoabCardContentProps): JSX.Element {
  return <goa-card-content>{children}</goa-card-content>;
}

export default GoabCardContent;
