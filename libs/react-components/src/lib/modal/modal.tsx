import React, { FC, useEffect, useRef } from 'react';
// import '@abgov/web-components';

interface WCProps {
  ref: React.RefObject<HTMLElement>;
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
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = (e: any) => {
      onClose?.();
    };

    current.addEventListener('_close', listener)
    return () => {
      current.removeEventListener('_close', listener);
    }
  }, [el, onClose])

  return (
    <goa-modal ref={el} title={title} open={open} closable={closable} scrollable={true}>
      {children}
    </goa-modal>
  );
}

export default GoAModal;
