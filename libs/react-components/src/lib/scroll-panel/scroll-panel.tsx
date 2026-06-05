import { DataAttributes } from "@abgov/ui-components-common";
import React, { ReactNode, type JSX } from "react";

interface WCProps {
  height?: string;
  direction?: "vertical" | "horizontal";
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-scroll-panel": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabScrollPanelProps extends DataAttributes {
  /** Content rendered in the sticky header region. */
  header?: ReactNode;
  /** Content rendered in the scrollable body region. */
  children?: ReactNode;
  /** Content rendered in the sticky footer region. */
  footer?: ReactNode;
  /**
   * Sets the height of the panel. Any valid CSS height value (e.g. "400px", "100%", "100vh").
   * Defaults to "100%". The parent element must establish a height context for "100%" to work.
   */
  height?: string;
  /** The scroll direction. Can be "vertical" (default) or "horizontal". */
  direction?: "vertical" | "horizontal";
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

export function GoabScrollPanel({
  header,
  children,
  footer,
  height,
  direction,
  testId,
  ...rest
}: GoabScrollPanelProps): JSX.Element {
  const hostStyle = height ? ({ height } as React.CSSProperties) : undefined;

  return (
    <goa-scroll-panel
      height={height}
      direction={direction}
      testid={testId}
      style={hostStyle}
      {...rest}
    >
      {header && <div slot="header">{header}</div>}
      {children}
      {footer && <div slot="footer">{footer}</div>}
    </goa-scroll-panel>
  );
}

export default GoabScrollPanel;
