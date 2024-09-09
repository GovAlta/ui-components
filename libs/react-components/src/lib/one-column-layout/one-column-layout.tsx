import { ReactNode } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-one-column-layout": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabPageProps {
  children?: ReactNode;
}

export type PageProps = GoabPageProps;

export function GoabOneColumnLayout(props: GoabPageProps): JSX.Element {
  return <goa-one-column-layout>{props.children}</goa-one-column-layout>;
}

export default GoabOneColumnLayout;
