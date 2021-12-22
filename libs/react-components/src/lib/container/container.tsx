import React, { FC, ReactNode } from 'react';

type ContainerVariant = 'primary' | 'info' | 'error' | 'success' | 'warning' | 'default';
type HeadingSize = 'large' | 'small' | 'none';

interface WCProps {
  variant: ContainerVariant;
  headingsize: HeadingSize;
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
  variant: ContainerVariant;
  title: ReactNode;
  actions: ReactNode;
  children: ReactNode;
}

export const GoAContainer: FC<Props> = ({
  headingSize,
  title,
  children,
  actions,
  variant = 'primary',
}) => {
  return (
    <goa-container variant={variant} headingsize={headingSize}>
      {title && <div slot="title">{title}</div>}
      {children}
      {actions && <div slot="actions">{actions}</div>}
    </goa-container>
  );
};

export default GoAContainer;
