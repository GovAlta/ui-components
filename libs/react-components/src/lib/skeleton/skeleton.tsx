import { GoABSkeletonSize, GoABSkeletonType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  maxwidth?: string;
  size?: GoABSkeletonSize;
  linecount?: number;
  type: GoABSkeletonType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-skeleton": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABSkeletonProps extends Margins {
  maxWidth?: string;
  size?: GoABSkeletonSize;
  lineCount?: number;
  type: GoABSkeletonType;
  testId?: string;
}

// legacy name
export type SkeletonProps = GoABSkeletonProps;

export const GoABSkeleton = ({
  maxWidth,
  size,
  lineCount,
  type,
  testId,
  mt,
  mr,
  mb,
  ml,
}: GoABSkeletonProps) => {
  return (
    <goa-skeleton
      maxwidth={maxWidth}
      linecount={lineCount}
      type={type}
      size={size}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    />
  );
};

export default GoABSkeleton;
