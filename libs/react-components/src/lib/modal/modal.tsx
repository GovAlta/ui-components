import React, { FC, useEffect, useRef } from 'react';

interface WCProps {
  ref: React.RefObject<HTMLElement>;
  title?: string;
  open?: boolean;
  width?: string;
  closable?: boolean;
  scrollable?: boolean;
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
  title?: string;
  width?: string;
  actions?: React.ReactElement;
  onClose?: () => void;
  open?: boolean;
}

export const GoAModal: FC<Props> = ({ title, children, open, width, actions, onClose }) => {
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
    <goa-modal ref={el} title={title} open={open} closable={!!onClose} scrollable={true} width={width}>
      {actions &&
        <div slot="actions">
          {actions}
        </div>
      }
      {children}
    </goa-modal>
  );
}

export default GoAModal;
