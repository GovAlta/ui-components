import React, { FC } from "react";
import { Margins } from "../../common/styling";

export type GoAButtonGroupAlignment = "start" | "end" | "center";
export type GoAButtonGroupGap = "relaxed" | "compact";

// legacy naming
export type Gap = GoAButtonGroupGap;

interface WCProps extends Margins {
  alignment: GoAButtonGroupAlignment;
  gap?: GoAButtonGroupGap;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-button-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface ButtonGroupProps extends Margins {
  alignment: GoAButtonGroupAlignment;
  gap?: GoAButtonGroupGap;
  testId?: string;
  children?: React.ReactNode;
}

export const GoAButtonGroup: FC<ButtonGroupProps> = ({
  alignment,
  gap,
  testId,
  children,
  mt,
  mr,
  mb,
  ml,
}) => {
  return (
    <goa-button-group
      alignment={alignment}
      gap={gap}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    >
      {children}
    </goa-button-group>
  );
};

export default GoAButtonGroup;
