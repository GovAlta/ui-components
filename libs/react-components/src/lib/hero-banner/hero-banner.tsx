import React, { FC } from "react";

interface WCProps {
  heading: string;
  backgroundurl: string;
  minheight?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-hero-banner": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props {
  heading: string;
  backgroundUrl: string;
  minHeight?: string;
  children?: React.ReactNode;
}

export const GoAHeroBanner: FC<Props> = ({
  heading,
  backgroundUrl,
  minHeight,
  children,
}) => {
  return (
    <goa-hero-banner
      heading={heading}
      backgroundurl={backgroundUrl}
      minheight={minHeight}
    >
      {children}
    </goa-hero-banner>
  );
};

export default GoAHeroBanner;
