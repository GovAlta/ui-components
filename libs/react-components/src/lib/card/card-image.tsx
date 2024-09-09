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

export interface GoabCardImageProps {
  src: string;
  height: string;
}

export function GoabCardImage({ src, height }: GoabCardImageProps): JSX.Element {
  return <goa-card-image src={src} height={height} />;
}

export default GoabCardImage;
