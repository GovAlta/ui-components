import {
  GoabIconFilledType,
  GoabIconSize,
  GoabIconTheme,
  GoabIconType,
  Margins,
} from "@abgov/ui-components-common";

import type { JSX } from "react";
import { toOptionalBooleanAsString } from "../../utils";

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

export interface GoabIconProps extends Margins {
  type: GoabIconType;
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
  type: GoabIconType;
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
  type,
  theme,
  size,
  inverted,
  fillColor,
  opacity,
  title,
  ariaLabel,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabIconProps): JSX.Element {
  return (
    <goa-icon
      type={type}
      theme={theme}
      size={size}
      inverted={
        typeof inverted === "boolean" ? toOptionalBooleanAsString(inverted) : inverted
      }
      // inverted={toOptionalBooleanAsString(inverted)}  // TODO: Change type to only boolean
      fillcolor={fillColor}
      opacity={opacity}
      title={title}
      arialabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
    />
  );
}
