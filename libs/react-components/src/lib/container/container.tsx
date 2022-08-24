import React, { FC, ReactNode } from 'react';

type ContainerVariant = 'interactive' | 'info' | 'error' | 'success' | 'warning' | 'non-interactive';
type HeadingSize = 'large' | 'small' | 'none';
type ContainerPadding = "relaxed" | "compact";

interface WCProps {
  variant: ContainerVariant;
  headingsize: HeadingSize;
  colored: boolean;
  padding: ContainerPadding;
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
  headingSize: HeadingSize;
  variant?: ContainerVariant;
  title?: ReactNode;
  colored?: boolean;
  padding: ContainerPadding;
  actions?: ReactNode;
}

export const GoAContainer: FC<Props> = ({
  headingSize,
  title,
  colored = false,
  padding,
  children,
  actions,
  variant = 'default',
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
