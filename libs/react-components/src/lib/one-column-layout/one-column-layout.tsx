import { ReactNode } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-one-column-layout": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoAPageProps {
  children?: ReactNode;
}

export type PageProps = GoAPageProps;

export function GoAOneColumnLayout(props: GoAPageProps): JSX.Element {
  return <goa-one-column-layout>{props.children}</goa-one-column-layout>;
}

export default GoAOneColumnLayout;
