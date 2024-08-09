import {
  GoABIconFilledType,
  GoABIconSize,
  GoABIconTheme,
  GoABIconType,
  Margins,
} from "@abgov/ui-components-common";

interface IonIconProps {
  name: GoABIconType | GoABIconFilledType;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IonIconElement extends HTMLElement {}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "ion-icon": IonIconProps & React.HTMLAttributes<IonIconElement>;
    }
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-icon": WCProps & React.HTMLAttributes<IonIconElement>;
    }
  }
}

export interface GoABIconProps extends Margins {
  type: GoABIconType;
  size?: GoABIconSize;
  theme?: GoABIconTheme;
  inverted?: string;
  fillColor?: string;
  opacity?: number;
  title?: string;
  ariaLabel?: string;
  testId?: string;
}

interface WCProps extends Margins {
  type: GoABIconType;
  theme?: GoABIconTheme;
  size?: GoABIconSize;
  inverted?: string;
  fillcolor?: string;
  opacity?: number;
  title?: string;
  arialabel?: string;
  testid?: string;
}

export function GoABIcon({
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
}: GoABIconProps): JSX.Element {
  return (
    <goa-icon
      type={type}
      theme={theme}
      size={size}
      inverted={inverted}
      fillcolor={fillColor}
      opacity={opacity}
      title={title}
      arialabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    />
  );
}
