import React, { FC, ReactNode } from "react";
import { Margins } from "../../common/styling";

interface WCProps {
  maxwidth?: string;
  padded?: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-popover": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props {
  target?: ReactNode;
  testId?: string;
  maxWidth?: string;
  padded?: boolean;
}

export const GoAPopover: FC<Props> = ({
  target,
  testId,
  maxWidth,
  padded,
  children,
}) => {
  return (
    <goa-popover data-testid={testId} maxwidth={maxWidth} padded={padded}>
      {children}
      {target && <div slot="target">{target}</div>}
    </goa-popover>
  );
};

export default GoAPopover;
