declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-actions": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardActionsProps {
  children?: React.ReactNode;
}

export function GoabCardActions({ children }: GoabCardActionsProps): JSX.Element {
  return <goa-card-actions>{children}</goa-card-actions>;
}

export default GoabCardActions;
