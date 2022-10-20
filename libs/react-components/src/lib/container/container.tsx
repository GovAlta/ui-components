import React, { FC, ReactNode } from "react";

type ContainerType =
  | "interactive"
  | "non-interactive"
  | "info"
  | "error"
  | "success"
  | "important";
type Accent = "thick" | "thin" | "filled";
type ContainerPadding = "relaxed" | "compact";

interface WCProps {
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

interface Props {
  accent?: Accent;
  type?: ContainerType;
  title?: ReactNode;
  padding?: ContainerPadding;
  actions?: ReactNode;
  children?: ReactNode;
}

export const GoAContainer: FC<Props> = ({
  accent,
  title,
  padding,
  children,
  actions,
  type,
}) => {
  return (
    <goa-container type={type} padding={padding} accent={accent}>
      {title && <div slot="title">{title}</div>}
      {children}
      {actions && <div slot="actions">{actions}</div>}
    </goa-container>
  );
};

export default GoAContainer;
