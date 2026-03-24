import { ReactNode, type JSX } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../../lib/common/extract-props";

interface WCProps {
  maxcontentwidth?: string;
  testid?: string;
  url?: string;
  version?: string;
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
export interface GoabxAppFooterProps extends DataAttributes {
  /**
   * The maximum width of the main content area
   * @default ""
   */
  maxContentWidth?: string;
  children?: ReactNode;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /**
   * URL for the Government of Alberta logo link. Set to empty string to disable the link.
   * @default "https://alberta.ca"
   */
  url?: string;
  version?: string;
}

export function GoabxAppFooter({ children, ...rest }: GoabxAppFooterProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-app-footer {..._props} version={"2"}>
      {children}
    </goa-app-footer>
  );
}

export default GoabxAppFooter;
