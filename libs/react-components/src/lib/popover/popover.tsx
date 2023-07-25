import React, { FC, ReactNode } from "react";
import { Margins } from "../../common/styling";

type Position = "above" | "below" | "auto";

interface WCProps extends Margins {
  maxwidth?: string;
  padded?: boolean;
  position?: Position;
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

interface Props extends Margins {
  target?: ReactNode;
  testId?: string;
  maxWidth?: string;
  padded?: boolean;
  position?: Position;
  children: ReactNode;
  relative?: boolean;
}

export const GoAPopover: FC<Props> = ({
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
}) => {
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
};

export default GoAPopover;
