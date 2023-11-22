import { Margins } from "../../common/styling";

export type GoASkeletonType =
  | "image"
  | "text"
  | "title"
  | "text-small"
  | "avatar"
  | "header"
  | "paragraph"
  | "thumbnail"
  | "card"
  | "profile"
  | "article";

export type GoASkeletonSize = 1 | 2 | 3 | 4;

// legacy naming
export type SkeletonType = GoASkeletonType;

interface WCProps extends Margins {
  maxwidth?: string;
  size?: GoASkeletonSize;
  linecount?: number;
  type: GoASkeletonType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-skeleton": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface SkeletonProps extends Margins {
  maxWidth?: string;
  size?: GoASkeletonSize;
  lineCount?: number;
  type: GoASkeletonType;
  testId?: string;
}

export const GoASkeleton = ({
  maxWidth,
  size,
  lineCount,
  type,
  testId,
  mt,
  mr,
  mb,
  ml,
}: SkeletonProps) => {
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

export default GoASkeleton;
