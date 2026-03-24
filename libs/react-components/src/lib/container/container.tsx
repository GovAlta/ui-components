import {
  GoabContainerAccent,
  GoabContainerPadding,
  GoabContainerType,
  GoabContainerWidth,
  Margins, DataAttributes,
} from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  type?: GoabContainerType;
  accent?: GoabContainerAccent;
  padding?: GoabContainerPadding;
  width?: GoabContainerWidth;
  maxwidth?: string;
  minheight?: string;
  maxheight?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-container": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabContainerProps extends Margins, DataAttributes {
  /**
   * Sets the style of accent on the container.
   * @default "filled"
   */
  accent?: GoabContainerAccent;
  /**
   * Sets the container and accent bar styling.
   * @default "interactive"
   */
  type?: GoabContainerType;
  heading?: ReactNode;
  title?: ReactNode;
  /**
   * Sets the amount of white space in the container.
   * @default "relaxed"
   */
  padding?: GoabContainerPadding;
  actions?: ReactNode;
  children?: ReactNode;
  /**
   * Sets the width of the container.
   * @default "full"
   */
  width?: GoabContainerWidth;
  /**
   * Sets the maximum width of the container.
   * @default "none"
   */
  maxWidth?: string;
  /**
   * Sets the minimum height of the container.
   * @default ""
   */
  minHeight?: string;
  /**
   * Sets the maximum height of the container.
   * @default ""
   */
  maxHeight?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
}

export function GoabContainer({
  heading,
  title,
  actions,
  children,
  ...rest
}: GoabContainerProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  const headingContent = heading || title;

  return (
    <goa-container {..._props}>
      {headingContent && <div slot="title">{headingContent}</div>}
      {children}
      {actions && <div slot="actions">{actions}</div>}
    </goa-container>
  );
}

export default GoabContainer;
