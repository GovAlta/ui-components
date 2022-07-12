import { ReactNode } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-page': React.HTMLAttributes<HTMLElement>
    }
  }
}

export interface PageProps {
  children: ReactNode;
}

export function GoAPage(props: PageProps) {
  return (
    <goa-page>
      {props.children}
    </goa-page>
  );
}

export default GoAPage;
