import React, { useEffect, useRef } from 'react';

interface WCProps {
  ref: React.RefObject<HTMLElement>;
  leadingicon: string;
  error: boolean;
  deletable: boolean;
  content: string;
}


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-chip': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}


export interface Props {
  onClick?: () => void;
  deletable?: boolean;
  leadingIcon?: string;
  error?: boolean;
  content: string;
}

export const GoAChip = ({ leadingIcon = "", deletable = false, error = false, content, onClick }: Props) => {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) return;
    if (!onClick) return;

    const current = el.current;
    const listener = (e: any) => { onClick(); };

    current.addEventListener('_click', listener)
    return () => {
      current.removeEventListener('_click', listener);
    }
  }, [el, onClick])

  return (
    <goa-chip ref={el} leadingicon={leadingIcon} error={error} deletable={deletable} content={content} />
  )
};

export default GoAChip;
