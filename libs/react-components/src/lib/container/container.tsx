import {
  GoabContainerAccent,
  GoabContainerPadding,
  GoabContainerType,
  GoabContainerWidth,
  Margins,
} from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";

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

export interface GoabContainerProps extends Margins {
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
  accent,
  heading,
  title,
  padding,
  children,
  actions,
  type,
  width,
  maxWidth,
  minHeight,
  maxHeight,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabContainerProps): JSX.Element {
  const headingContent = heading || title;
  return (
    <goa-container
      type={type}
      padding={padding}
      accent={accent}
      width={width}
      maxwidth={maxWidth}
      minheight={minHeight}
      maxheight={maxHeight}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
    >
      {headingContent && <div slot="title">{headingContent}</div>}
      {children}
      {actions && <div slot="actions">{actions}</div>}
    </goa-container>
  );
}

export default GoabContainer;
