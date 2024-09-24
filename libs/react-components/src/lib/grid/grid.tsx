import { Margins, Spacing } from "../../common/styling";

interface WCProps extends Margins {
  gap?: Spacing;
  minchildwidth: string;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-grid": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoAGridProps extends Margins {
  gap?: Spacing;
  minChildWidth: string;
  testId?: string;
  children?: React.ReactNode;
}

export function GoAGrid({
  gap,
  minChildWidth,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoAGridProps): JSX.Element {
  return (
    <goa-grid
      gap={gap}
      mt={mt}
      minchildwidth={minChildWidth}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
    >
      {children}
    </goa-grid>
  );
}

export default GoAGrid;
