import React, { FC } from "react";
import { Margins } from "../../common/styling";

type Alignment = "start" | "end" | "center";
export type Gap = "relaxed" | "compact";

interface WCProps extends Margins {
  alignment: Alignment;
  gap?: Gap;
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
  alignment: Alignment;
  gap?: Gap;
  children?: React.ReactNode;
}

export const GoAButtonGroup: FC<ButtonGroupProps> = ({
  alignment,
  gap,
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
    >
      {children}
    </goa-button-group>
  );
};

export default GoAButtonGroup;
