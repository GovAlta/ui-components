import React, { FC, ReactNode } from 'react';

type ContainerVariant = 'interactive' | 'non-interactive' | 'info' | 'error' | 'success' | 'warning';
type HeadingSize = 'large' | 'small' | 'none';
type ContainerPadding = "relaxed" | "compact";

interface WCProps {
  variant?: ContainerVariant;
  headingsize?: HeadingSize;
  colored?: boolean;
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
  headingSize?: HeadingSize;
  variant?: ContainerVariant;
  title?: ReactNode;
  colored?: boolean;
  padding?: ContainerPadding;
  actions?: ReactNode;
  children?: ReactNode;
}

export const GoAContainer: FC<Props> = ({
  headingSize,
  title,
  colored = false,
  padding,
  children,
  actions,
  variant,
}) => {
  return (
    <goa-container variant={variant} padding={padding} headingsize={headingSize} colored={colored}>
      {title && <div slot="title">{title}</div>}
      {children}
      {actions && <div slot="actions">{actions}</div>}
    </goa-container>
  );
};

export default GoAContainer;
