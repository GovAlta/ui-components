import {
  GoabContainerAccent,
  GoabContainerPadding,
  GoabContainerType,
  GoabContainerWidth,
  Margins
} from "../../common/types";
import { ReactNode } from "react";

interface WCProps extends Margins {
  type?: GoabContainerType;
  accent?: GoabContainerAccent;
  padding?: GoabContainerPadding;
  width?: GoabContainerWidth;
  maxwidth?: string;
  testid?: string;
}

declare global {
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
