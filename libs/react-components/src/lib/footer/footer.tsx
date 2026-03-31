import { ReactNode, type JSX } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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
export interface GoabAppFooterProps extends DataAttributes {
  /** The maximum width of the main content area. */
  maxContentWidth?: string;
  /** URL for the Government of Alberta logo link. Set to empty string to disable the link. @default "https://alberta.ca" */
  url?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Content rendered inside the footer, typically navigation and meta sections. */
  children?: ReactNode;
}

export function GoabAppFooter({ children, ...rest }: GoabAppFooterProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-app-footer {..._props} version={"2"}>
      {children}
    </goa-app-footer>
  );
}

export default GoabAppFooter;
