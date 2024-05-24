declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-content": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface ABGovCardContentProps {
  children?: React.ReactNode;
}

export function ABGovCardContent({ children }: ABGovCardContentProps): JSX.Element {
  return <goa-card-content>{children}</goa-card-content>;
}

export default ABGovCardContent;
