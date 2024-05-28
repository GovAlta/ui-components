import { ReactNode } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-one-column-layout": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABPageProps {
  children?: ReactNode;
}

export type PageProps = GoABPageProps;

export function GoABOneColumnLayout(props: GoABPageProps): JSX.Element {
  return <goa-one-column-layout>{props.children}</goa-one-column-layout>;
}

export default GoABOneColumnLayout;
