type DividerSpacing = "small" | "medium" | "large";


interface WCDividerProps {
  spacing: DividerSpacing;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      'goa-divider': WCDividerProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

/* eslint-disable-next-line */
export interface DividerProps {
  spacing: DividerSpacing;
}


export function GoADivider(props: DividerProps) {

  return (
    <goa-divider spacing={props.spacing} />
  );
}

export default GoADivider;
