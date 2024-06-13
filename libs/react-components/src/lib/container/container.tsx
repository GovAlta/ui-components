import {
  GoABContainerAccent,
  GoABContainerPadding,
  GoABContainerType,
  GoABContainerWidth,
  Margins,
} from "@abgov/ui-components-common";
import { ReactNode } from "react";

interface WCProps extends Margins {
  type?: GoABContainerType;
  accent?: GoABContainerAccent;
  padding?: GoABContainerPadding;
  width?: GoABContainerWidth;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-container": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABContainerProps extends Margins {
  accent?: GoABContainerAccent;
  type?: GoABContainerType;
  heading?: ReactNode;
  title?: ReactNode;
  padding?: GoABContainerPadding;
  actions?: ReactNode;
  children?: ReactNode;
  width?: GoABContainerWidth;
  testId?: string;
}

export function GoABContainer({
  accent,
  heading,
  title,
  padding,
  children,
  actions,
  type,
  width,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoABContainerProps): JSX.Element {
  const headingContent = heading || title;
  return (
    <goa-container
      type={type}
      padding={padding}
      accent={accent}
      width={width}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    >
      {headingContent && <div slot="title">{headingContent}</div>}
      {children}
      {actions && <div slot="actions">{actions}</div>}
    </goa-container>
  );
}

export default GoABContainer;
