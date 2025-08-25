import {
  GoabIconFilledType,
  GoabIconOverridesType,
  GoabIconSize,
  GoabIconTheme,
  GoabIconType,
  Margins, DataAttributes,
} from "@abgov/ui-components-common";

import type { JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface IonIconProps {
  name: GoabIconType | GoabIconFilledType;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IonIconElement extends HTMLElement {}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": IonIconProps & React.HTMLAttributes<IonIconElement>;
    }
  }
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-icon": WCProps & React.HTMLAttributes<IonIconElement>;
    }
  }
}

export interface GoabIconProps extends Margins, DataAttributes {
  type: GoabIconType | GoabIconOverridesType;
  size?: GoabIconSize;
  theme?: GoabIconTheme;
  inverted?: string | boolean; // TODO: Change type to only boolean
  fillColor?: string;
  opacity?: number;
  title?: string;
  ariaLabel?: string;
  testId?: string;
}

interface WCProps extends Margins {
  type: GoabIconType | GoabIconOverridesType;
  theme?: GoabIconTheme;
  size?: GoabIconSize;
  inverted?: string;
  fillcolor?: string;
  opacity?: number;
  title?: string;
  arialabel?: string;
  testid?: string;
}

export function GoabIcon({
  inverted,
  ...rest
}: GoabIconProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-icon
      inverted={
        typeof inverted === "boolean" ? (inverted ? "true" : undefined) : inverted
      }
      {..._props}
    />
  );
}
