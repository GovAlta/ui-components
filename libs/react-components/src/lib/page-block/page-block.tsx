import { ReactNode } from "react";

interface WCProps {
  width: "full" | string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-page-block": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface ABGovPageBlockProps {
  width: "full" | string;
  testId?: string;
  children?: ReactNode;
}

// legacy name
export type PageBlockProps = ABGovPageBlockProps;

export function ABGovPageBlock(props: PageBlockProps): JSX.Element {
  return (
    <goa-page-block width={props.width} data-testid={props.testId}>
      {props.children}
    </goa-page-block>
  );
}
