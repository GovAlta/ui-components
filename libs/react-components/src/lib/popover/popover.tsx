import { DataAttributes, GoabPopoverPosition, Margins } from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  maxwidth?: string;
  minwidth?: string;
  padded?: string;
  position?: GoabPopoverPosition;
  relative?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-popover": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabPopoverProps extends Margins, DataAttributes {
  /** TO DO: Write a description */
  target?: ReactNode;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default "popover"
   */
  testId?: string;
  /**
   * Sets the maximum width of the popover container.
   * @default "320px"
   */
  maxWidth?: string;
  /**
   * Sets the minimum width of the popover container.
   * @default ""
   */
  minWidth?: string;
  /**
   * Sets if the popover has padding. Use false when content needs to be flush with boundaries.
   * @default true
   */
  padded?: boolean;
  /**
   * Provides control to where the popover content is positioned.
   * @default "auto"
   */
  position?: GoabPopoverPosition;
  /** TO DO: Write a description */
  children: ReactNode;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  relative?: boolean;
}

export function GoabPopover({
  target,
  padded,
  relative,
  children,
  ...rest
}: GoabPopoverProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-popover
      padded={typeof padded === "undefined" ? undefined : padded ? "true" : "false"}
      relative={relative ? "true" : undefined}
      {..._props}
    >
      {children}
      {target && <div slot="target">{target}</div>}
    </goa-popover>
  );
}

export default GoabPopover;
