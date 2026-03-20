import { DataAttributes } from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";

interface WCProps {
  height?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-sticky-container": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabStickyContainerProps extends DataAttributes {
  /** Content rendered in the sticky header region. */
  header?: ReactNode;
  /** Content rendered in the scrollable body region. */
  children?: ReactNode;
  /** Content rendered in the sticky footer region. */
  footer?: ReactNode;
  /**
   * Sets the height of the container. Any valid CSS height value (e.g. "400px", "100%", "100vh").
   * Defaults to "100%". The parent element must establish a height context for "100%" to work.
   */
  height?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

export function GoabStickyContainer({
  header,
  children,
  footer,
  height,
  testId,
  ...rest
}: GoabStickyContainerProps): JSX.Element {
  return (
    <goa-sticky-container height={height} testid={testId} {...rest}>
      {header && <div slot="header">{header}</div>}
      {children}
      {footer && <div slot="footer">{footer}</div>}
    </goa-sticky-container>
  );
}

export default GoabStickyContainer;
