import { ReactNode, type JSX } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  maxcontentwidth?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabAppFooterProps extends DataAttributes {
  /** The maximum width of the main content area. */
  maxContentWidth?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Content rendered inside the footer, typically navigation and meta sections. */
  children?: ReactNode;
}

/** Provides information related your service at the bottom of every page. */
export function GoabAppFooter({ children, ...rest }: GoabAppFooterProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return <goa-app-footer {..._props}>{children}</goa-app-footer>;
}

export default GoabAppFooter;
