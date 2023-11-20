import { FC } from "react";
import { Margins } from "../../common/styling";

interface WCProps extends Margins {
  elevation?: number;
  width?: string;
  children: React.ReactNode;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoACardProps extends Margins {
  elevation?: number;
  width?: string;
  testId?: string;
  children?: React.ReactNode;
}

export const GoACard: FC<GoACardProps> = ({
  elevation,
  width,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}) => {
  return (
    <goa-card
      width={width}
      elevation={elevation}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    >
      {children}
    </goa-card>
  );
};

export default GoACard;
