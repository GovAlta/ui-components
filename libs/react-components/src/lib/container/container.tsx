import React, { FC, ReactNode } from 'react';

type ContainerVariant = 'primary' | 'info' | 'error' | 'success' | 'warning' | 'default';
type HeadingSize = 'large' | 'small' | 'none';

interface WCProps {
  variant: ContainerVariant;
  headingsize: HeadingSize;
  colored: boolean;
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
  actions?: ReactNode;
  children: ReactNode;
}

export const GoAContainer: FC<Props> = ({
  headingSize,
  title,
  colored = false,
  children,
  actions,
  variant = 'default',
}) => {
  return (
    <goa-container variant={variant} headingsize={headingSize} colored={colored}>
      {title && <div slot="title">{title}</div>}
      {children}
      {actions && <div slot="actions">{actions}</div>}
    </goa-container>
  );
};

export default GoAContainer;
