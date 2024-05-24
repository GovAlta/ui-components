import { ABGovButtonGroupAlignment, ABGovButtonGroupGap, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  alignment: ABGovButtonGroupAlignment;
  gap?: ABGovButtonGroupGap;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-button-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface ABGovButtonGroupProps extends Margins {
  alignment: ABGovButtonGroupAlignment;
  gap?: ABGovButtonGroupGap;
  testId?: string;
  children?: React.ReactNode;
}

export function ABGovButtonGroup({
  alignment,
  gap,
  testId,
  children,
  mt,
  mr,
  mb,
  ml,
}: ABGovButtonGroupProps): JSX.Element {
  return (
    <goa-button-group
      alignment={alignment}
      gap={gap}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    >
      {children}
    </goa-button-group>
  );
}

export default ABGovButtonGroup;
