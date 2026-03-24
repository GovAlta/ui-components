import { ReactNode, type JSX } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  maxcontentwidth?: string;
  testid?: string;
  url?: string;
}

/* eslint-disable-next-line */
export interface GoabAppFooterProps extends DataAttributes {
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
