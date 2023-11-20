import { FC } from "react";

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

export interface GoACardImageProps {
  src: string;
  height: string;
}

export const GoACardImage: FC<GoACardImageProps> = ({ src, height }) => {
  return <goa-card-image src={src} height={height} />;
};

export default GoACardImage;
