import { ReactNode, type JSX } from "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-one-column-layout": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabPageProps {
  /** Content rendered inside the one-column layout. */
  children?: ReactNode;
}

export type PageProps = GoabPageProps;

/** Organizes page content in a single responsive column. */
export function GoabOneColumnLayout(props: GoabPageProps): JSX.Element {
  return <goa-one-column-layout>{props.children}</goa-one-column-layout>;
}

export default GoabOneColumnLayout;
