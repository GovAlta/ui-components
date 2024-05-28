declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-actions": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABCardActionsProps {
  children?: React.ReactNode;
}

export function GoABCardActions({ children }: GoABCardActionsProps): JSX.Element {
  return <goa-card-actions>{children}</goa-card-actions>;
}

export default GoABCardActions;
