import { GoabPageBlockSize } from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";

interface WCProps {
  width?: GoabPageBlockSize;
  testid?: string;
  version?: string;
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
  width?: GoabPageBlockSize;
  testId?: string;
  children?: ReactNode;
}

// legacy name
export type PageBlockProps = GoabPageBlockProps;

export function GoabPageBlock(props: PageBlockProps): JSX.Element {
  return (
    <goa-page-block width={props.width} testid={props.testId} version={"2"}>
      {props.children}
    </goa-page-block>
  );
}
