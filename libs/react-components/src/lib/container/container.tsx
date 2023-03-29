import React, { FC, ReactNode } from "react";
import { Margins } from "../../common/styling";

type ContainerType =
  | "interactive"
  | "non-interactive"
  | "info"
  | "error"
  | "success"
  | "important";
type Accent = "thick" | "thin" | "filled";
type ContainerPadding = "relaxed" | "compact";

interface WCProps extends Margins {
  type?: ContainerType;
  accent?: Accent;
  padding?: ContainerPadding;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-container": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props extends Margins {
  accent?: Accent;
  type?: ContainerType;
  heading?: ReactNode;
  title?: ReactNode;
  padding?: ContainerPadding;
  actions?: ReactNode;
  children?: ReactNode;
  testId?: string;
}

export const GoAContainer: FC<Props> = ({
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
