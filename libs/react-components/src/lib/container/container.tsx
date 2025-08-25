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
  accent?: GoabContainerAccent;
  type?: GoabContainerType;
  heading?: ReactNode;
  title?: ReactNode;
  padding?: GoabContainerPadding;
  actions?: ReactNode;
  children?: ReactNode;
  width?: GoabContainerWidth;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
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
