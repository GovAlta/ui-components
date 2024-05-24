import { ABGovSkeletonSize, ABGovSkeletonType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  maxwidth?: string;
  size?: ABGovSkeletonSize;
  linecount?: number;
  type: ABGovSkeletonType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-skeleton": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface ABGovSkeletonProps extends Margins {
  maxWidth?: string;
  size?: ABGovSkeletonSize;
  lineCount?: number;
  type: ABGovSkeletonType;
  testId?: string;
}

// legacy name
export type SkeletonProps = ABGovSkeletonProps;

export const ABGovSkeleton = ({
  maxWidth,
  size,
  lineCount,
  type,
  testId,
  mt,
  mr,
  mb,
  ml,
}: ABGovSkeletonProps) => {
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

export default ABGovSkeleton;
