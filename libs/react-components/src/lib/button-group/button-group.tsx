import {
  GoABButtonGroupAlignment,
  GoABButtonGroupGap,
  Margins,
} from "@abgov/ui-components-common";

interface WCProps extends Margins {
  alignment: GoABButtonGroupAlignment;
  gap?: GoABButtonGroupGap;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-button-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABButtonGroupProps extends Margins {
  alignment: GoABButtonGroupAlignment;
  gap?: GoABButtonGroupGap;
  testId?: string;
  children?: React.ReactNode;
}

export function GoABButtonGroup({
  alignment,
  gap,
  testId,
  children,
  mt,
  mr,
  mb,
  ml,
}: GoABButtonGroupProps): JSX.Element {
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

export default GoABButtonGroup;
