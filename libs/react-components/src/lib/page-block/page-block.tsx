import { GoabPageBlockSize } from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";

interface WCProps {
  width?: GoabPageBlockSize;
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
  /** Maximum width of the content area. Use "full" for 100% width or a CSS dimension like "1200px". @default "full" */
  width?: GoabPageBlockSize;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Content rendered inside the page block. */
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
