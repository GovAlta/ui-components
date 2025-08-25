import { ReactNode, type JSX } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  maxcontentwidth?: string;
  testid?: string;
  url?: string;
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
  maxContentWidth?: string;
  children?: ReactNode;
  testId?: string;
  url?: string;
}

// legacy name
export type FooterProps = GoabAppFooterProps;

export function GoabAppFooter({
  children,
  ...rest
}: GoabAppFooterProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-app-footer {..._props}>
      {children}
    </goa-app-footer>
  );
}

export default GoabAppFooter;
