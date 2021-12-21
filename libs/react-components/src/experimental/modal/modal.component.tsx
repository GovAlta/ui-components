import React, { FC } from 'react';

interface WCProps {
  title: string;
  closable: boolean;
  scrollable: boolean;
  open?: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-modal': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface Props {
  title: string;
  closable: boolean;
  open?: boolean;
  onClose?: () => void;
}

export const GoAModal: FC<Props> = ({ title, children, open, closable, onClose }) => {
  return (
    <goa-modal title={title} open={open} closable={closable} scrollable>
      {children}
    </goa-modal>
  );
}

export default GoAModal;
