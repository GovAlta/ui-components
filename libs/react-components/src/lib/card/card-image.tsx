import type { JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";
interface WCProps {
  src: string;
  height: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-image": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardImageProps extends DataGridProps {
  src: string;
  height: string;
}

export function GoabCardImage(props: GoabCardImageProps): JSX.Element {
  const [dataGridProps, { src, height}] = useDataGridProps(props);
  return <goa-card-image src={src} height={height}  {...dataGridProps} />;
}

export default GoabCardImage;
