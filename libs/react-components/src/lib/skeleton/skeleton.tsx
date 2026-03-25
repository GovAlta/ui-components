import { GoabSkeletonSize, GoabSkeletonType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  maxwidth?: string;
  size?: GoabSkeletonSize;
  linecount?: number;
  type: GoabSkeletonType;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-skeleton": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabSkeletonProps extends Margins {
  /**
   * Sets the maximum width. Currently only used in card skeleton type.
   * @default "300px"
   */
  maxWidth?: string;
  /**
   * Size can affect either the height, width or both for different skeleton types.
   * @default "1"
   */
  size?: GoabSkeletonSize;
  /**
   * Used within components that contain multiple lines. Currently only used in card skeleton type
   * @default 3
   */
  lineCount?: number;
  /**
   * Sets the skeleton shape to represent your content.
   * @required
   */
  type: GoabSkeletonType;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
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
