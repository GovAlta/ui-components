import { ABGovIconFilledType, ABGovIconSize, ABGovIconTheme, ABGovIconType, Margins } from "@abgov/ui-components-common";

interface IonIconProps {
  name: ABGovIconType | ABGovIconFilledType;
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

export interface ABGovIconProps extends Margins {
  type: ABGovIconType;
  size?: ABGovIconSize;
  theme?: ABGovIconTheme;
  testId?: string;
}

interface WCProps extends Margins {
  type: ABGovIconType;
  theme?: ABGovIconTheme;
  size?: ABGovIconSize;
}

export function ABGovIcon({
  type,
  theme,
  size,
  mt,
  mr,
  mb,
  ml,
  testId,
}: ABGovIconProps): JSX.Element {
  return (
    <goa-icon
      type={type}
      theme={theme}
      size={size}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    />
  );
}
