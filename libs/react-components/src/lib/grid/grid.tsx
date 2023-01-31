import React, { FC } from "react";
import { Margins, Spacing } from "../../common/styling";

interface WCProps extends Margins {
  gap?: Spacing;
  minchildwidth: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-grid": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props extends Margins {
  gap?: Spacing;
  minChildWidth: string;
  testId?: string;
  children?: React.ReactNode;
}

export const GoAGrid: FC<Props> = ({
  gap,
  minChildWidth,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}) => {
  return (
    <goa-grid
      gap={gap}
      mt={mt}
      minchildwidth={minChildWidth}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    >
      {children}
    </goa-grid>
  );
};

export default GoAGrid;
