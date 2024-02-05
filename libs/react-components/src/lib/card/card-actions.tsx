declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-actions": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoACardActionsProps {
  children?: React.ReactNode;
}

export function GoACardActions({ children }: GoACardActionsProps): JSX.Element {
  return <goa-card-actions>{children}</goa-card-actions>;
}

export default GoACardActions;
