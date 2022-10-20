import React, { FC } from "react";

interface WCProps {
  src: string;
  height: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-image": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props {
  src: string;
  height: string;
}

export const GoACardImage: FC<Props> = ({ src, height }) => {
  return <goa-card-image src={src} height={height} />;
};

export default GoACardImage;
