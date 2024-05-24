declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-actions": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface ABGovCardActionsProps {
  children?: React.ReactNode;
}

export function ABGovCardActions({ children }: ABGovCardActionsProps): JSX.Element {
  return <goa-card-actions>{children}</goa-card-actions>;
}

export default ABGovCardActions;
