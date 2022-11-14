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

interface Props extends Margins {
  elevation?: number;
  width?: string;
  children?: React.ReactNode;
}

export const GoACard: FC<Props> = ({
  elevation,
  width,
  mt,
  mr,
  mb,
  ml,
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
    >
      {children}
    </goa-card>
  );
};

export default GoACard;
