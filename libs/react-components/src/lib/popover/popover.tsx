import { GoabPopoverPosition, Margins } from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";

interface WCProps extends Margins {
  maxwidth?: string;
  minwidth?: string;
  padded?: string;
  position?: GoabPopoverPosition;
  relative?: string;
  testid?: string;
  tabindex?: number;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-popover": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabPopoverProps extends Margins {
  target?: ReactNode;
  testId?: string;
  maxWidth?: string;
  minWidth?: string;
  padded?: boolean;
  position?: GoabPopoverPosition;
  children: ReactNode;
  tabIndex?: number;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  relative?: boolean;
}

export function GoabPopover({
  target,
  testId,
  maxWidth,
  minWidth,
  padded,
  position,
  relative,
  children,
  tabIndex = -1,
  mt,
  mr,
  mb,
  ml,
}: GoabPopoverProps): JSX.Element {
  return (
    <goa-popover
      testid={testId}
      maxwidth={maxWidth}
      minwidth={minWidth}
      padded={typeof padded === "undefined" ? undefined : padded ? "true" : "false"}
      position={position}
      relative={relative ? "true" : undefined}
      tabindex={tabIndex}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
      {target && <div slot="target">{target}</div>}
    </goa-popover>
  );
}

export default GoabPopover;
