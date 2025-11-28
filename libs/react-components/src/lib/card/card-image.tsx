import type { JSX } from "react";
import { DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";
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
  const _props = extractProps<WCProps>(props, {
    attributeMapping: "lowercase",
  });

  return <goa-card-image {..._props} />;
}

export default GoabCardImage;
