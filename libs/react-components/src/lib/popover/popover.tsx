import { ReactNode } from "react";
import { Margins } from "../../common/styling";

export type GoAPosition = "above" | "below" | "auto";

interface WCProps extends Margins {
  maxwidth?: string;
  minwidth?: string;
  padded?: boolean;
  position?: GoAPosition;
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

export interface GoAPopoverProps extends Margins {
  target?: ReactNode;
  testId?: string;
  maxWidth?: string;
  minWidth?: string;
  padded?: boolean;
  position?: GoAPosition;
  children: ReactNode;
  relative?: boolean;
}

export function GoAPopover({
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
}: GoAPopoverProps): JSX.Element {
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

export default GoAPopover;
