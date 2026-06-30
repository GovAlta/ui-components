import { DataAttributes } from "@abgov/ui-components-common";
import React, { ReactNode, type JSX } from "react";

interface WCProps {
  height?: string;
  width?: string;
  direction?: string;
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
   * Sets the height of the panel. Accepts any valid CSS height value, including
   * calc()/min()/clamp() and viewport units (e.g. "400px", "100%", "100vh",
   * "calc(100vh - 4rem)"). Invalid values fall back to "100%". Defaults to "100%".
   * The parent element must establish a height context for "100%" to resolve.
   */
  height?: string;
  /**
   * Sets the width of the panel. Accepts any valid CSS width value.
   * Defaults to "100%". In horizontal mode this creates the overflow constraint.
   */
  width?: string;
  /**
   * The scroll direction of the panel.
   * - "vertical" (default): header top, footer bottom, content scrolls vertically.
   * - "horizontal": header left, footer right, content scrolls horizontally.
   */
  direction?: "vertical" | "horizontal";
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

export function GoabScrollPanel({
  header,
  children,
  footer,
  height,
  width,
  direction,
  testId,
  ...rest
}: GoabScrollPanelProps): JSX.Element {
  const hostStyle = {
    ...(height ? { height } : undefined),
    ...(width ? { width } : undefined),
  } as React.CSSProperties;

  return (
    <goa-scroll-panel
      height={height}
      width={width}
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
