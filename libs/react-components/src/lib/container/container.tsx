import {
  GoabContainerAccent,
  GoabContainerPadding,
  GoabContainerType,
  GoabContainerWidth,
  Margins,
  DataAttributes,
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
  /** Sets the container and accent bar styling. @default "interactive" */
  type?: GoabContainerType;
  /** Sets the style of accent on the container. @default "filled" */
  accent?: GoabContainerAccent;
  /** Sets the amount of white space in the container. @default "relaxed" */
  padding?: GoabContainerPadding;
  /** Sets the width of the container. @default "full" */
  width?: GoabContainerWidth;
  /** Sets the maximum width of the container. */
  maxWidth?: string;
  /** Sets the minimum height of the container. */
  minHeight?: string;
  /** Sets the maximum height of the container. */
  maxHeight?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Content rendered in the container's title/heading area. */
  heading?: ReactNode;
  /** @deprecated Use heading instead. Alias for the heading prop. */
  title?: ReactNode;
  /** Content rendered in the container's actions area, typically buttons or controls. */
  actions?: ReactNode;
  /** Content rendered inside the container body. */
  children?: ReactNode;
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
