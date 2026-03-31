import type { JSX } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";
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

export interface GoabCardImageProps extends DataAttributes {
  /** @required The URL of the image to display. */
  src: string;
  /** @required Height of the image container. Accepts CSS values like "200px" or "100%". */
  height: string;
}

export function GoabCardImage(props: GoabCardImageProps): JSX.Element {
  const _props = transformProps<WCProps>(props, lowercase);

  return <goa-card-image {..._props} />;
}

export default GoabCardImage;
