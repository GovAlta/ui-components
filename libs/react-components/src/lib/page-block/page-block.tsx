import { ReactNode, type JSX } from "react";

interface WCProps {
  width: "full" | string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-page-block": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabPageBlockProps {
  width: "full" | string;
  testId?: string;
  children?: ReactNode;
}

// legacy name
export type PageBlockProps = GoabPageBlockProps;

export function GoabPageBlock(props: PageBlockProps): JSX.Element {
  return (
    <goa-page-block width={props.width} testid={props.testId}>
      {props.children}
    </goa-page-block>
  );
}
