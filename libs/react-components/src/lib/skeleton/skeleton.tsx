import { GoabSkeletonSize, GoabSkeletonType } from "../../common/types";
import { Margins } from "../../common/types";

interface WCProps extends Margins {
  maxwidth?: string;
  size?: GoabSkeletonSize;
  linecount?: number;
  type: GoabSkeletonType;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-skeleton": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabSkeletonProps extends Margins {
  maxWidth?: string;
  size?: GoabSkeletonSize;
  lineCount?: number;
  type: GoabSkeletonType;
  testId?: string;
}

// legacy name
export type SkeletonProps = GoabSkeletonProps;

export const GoabSkeleton = ({
  maxWidth,
  size,
  lineCount,
  type,
  testId,
  mt,
  mr,
  mb,
  ml,
}: GoabSkeletonProps) => {
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
      testid={testId}
    />
  );
};

export default GoabSkeleton;
