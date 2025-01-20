import { GoabPopoverPosition, Margins } from "@abgov/ui-components-common";
import { ReactNode } from "react";

interface WCProps extends Margins {
  maxwidth?: string;
  minwidth?: string;
  padded?: boolean;
  position?: GoabPopoverPosition;
  relative?: boolean;
  testid?: string;
}

declare global {
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
      padded={padded}
      position={position}
      relative={relative}
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
