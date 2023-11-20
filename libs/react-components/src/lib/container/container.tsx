import React, { FC, ReactNode } from "react";
import { Margins } from "../../common/styling";

export type GoAContainerType =
  | "interactive"
  | "non-interactive"
  | "info"
  | "error"
  | "success"
  | "important";
export type GoAContainerAccent = "thick" | "thin" | "filled";
export type GoAContainerPadding = "relaxed" | "compact";

interface WCProps extends Margins {
  type?: GoAContainerType;
  accent?: GoAContainerAccent;
  padding?: GoAContainerPadding;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-container": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoAContainerProps extends Margins {
  accent?: GoAContainerAccent;
  type?: GoAContainerType;
  heading?: ReactNode;
  title?: ReactNode;
  padding?: GoAContainerPadding;
  actions?: ReactNode;
  children?: ReactNode;
  testId?: string;
}

export const GoAContainer: FC<GoAContainerProps> = ({
  accent,
  heading,
  title,
  padding,
  children,
  actions,
  type,
  mt,
  mr,
  mb,
  ml,
  testId,
}) => {
  const headingContent = heading || title;
  return (
    <goa-container
      type={type}
      padding={padding}
      accent={accent}
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
};

export default GoAContainer;
