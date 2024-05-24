import { ABGovPopoverPosition, Margins } from "@abgov/ui-components-common";
import { ReactNode } from "react";

interface WCProps extends Margins {
  maxwidth?: string;
  padded?: boolean;
  position?: ABGovPopoverPosition;
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

export interface ABGovPopoverProps extends Margins {
  target?: ReactNode;
  testId?: string;
  maxWidth?: string;
  padded?: boolean;
  position?: ABGovPopoverPosition;
  children: ReactNode;
  relative?: boolean;
}

export function ABGovPopover({
  target,
  testId,
  maxWidth,
  padded,
  position,
  relative,
  children,
  mt,
  mr,
  mb,
  ml,
}: ABGovPopoverProps): JSX.Element {
  return (
    <goa-popover
      data-testid={testId}
      maxwidth={maxWidth}
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

export default ABGovPopover;
