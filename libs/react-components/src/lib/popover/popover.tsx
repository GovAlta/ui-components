import { GoABPopoverPosition, Margins } from "@abgov/ui-components-common";
import { ReactNode } from "react";

interface WCProps extends Margins {
  maxwidth?: string;
  minwidth?: string;
  padded?: boolean;
  position?: GoABPopoverPosition;
  relative?: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-popover": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABPopoverProps extends Margins {
  target?: ReactNode;
  testId?: string;
  maxWidth?: string;
  minWidth?: string;
  padded?: boolean;
  position?: GoABPopoverPosition;
  children: ReactNode;
  relative?: boolean;
}

export function GoABPopover({
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
}: GoABPopoverProps): JSX.Element {
  return (
    <goa-popover
      data-testid={testId}
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

export default GoABPopover;
