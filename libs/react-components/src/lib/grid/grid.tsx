import { Margins, Spacing } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  gap?: Spacing;
  minchildwidth: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-grid": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABGridProps extends Margins {
  gap?: Spacing;
  minChildWidth: string;
  testId?: string;
  children?: React.ReactNode;
}

export function GoABGrid({
  gap,
  minChildWidth,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoABGridProps): JSX.Element {
  return (
    <goa-grid
      gap={gap}
      mt={mt}
      minchildwidth={minChildWidth}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    >
      {children}
    </goa-grid>
  );
}

export default GoABGrid;
