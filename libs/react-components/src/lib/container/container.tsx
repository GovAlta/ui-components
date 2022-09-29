import React, { FC, ReactNode } from 'react';

type ContainerType = 'interactive' | 'non-interactive' | 'info' | 'error' | 'success' | 'warning';
type AccentBar = 'large' | 'small' | 'none';
type ContainerPadding = "relaxed" | "compact";

interface WCProps {
  type?: ContainerType;
  accentbar?: AccentBar;
  backgroundcolour?: boolean;
  padding?: ContainerPadding;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-container': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface Props {
  accentBar?: AccentBar;
  type?: ContainerType;
  title?: ReactNode;
  backgroundColour?: boolean;
  padding?: ContainerPadding;
  actions?: ReactNode;
  children?: ReactNode;
}

export const GoAContainer: FC<Props> = ({
  accentBar,
  title,
  backgroundColour = false,
  padding,
  children,
  actions,
  type,
}) => {
  return (
    <goa-container type={type} padding={padding} accentbar={accentBar} backgroundcolour={backgroundColour}>
      {title && <div slot="title">{title}</div>}
      {children}
      {actions && <div slot="actions">{actions}</div>}
    </goa-container>
  );
};

export default GoAContainer;
