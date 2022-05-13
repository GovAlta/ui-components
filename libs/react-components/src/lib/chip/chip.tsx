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
  onDeleteIconClick?: () => void;
  leadingIcon?: string;
  error?: boolean;
  content: string;
}

export const GoAChip = ({ leadingIcon = "", error = false, content, onDeleteIconClick }: Props) => {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) return;
    if (!onDeleteIconClick) return;

    const current = el.current;
    const listener = (e: any) => { onDeleteIconClick(); };

    current.addEventListener('_onDeleteIconClick', listener)
    return () => {
      current.removeEventListener('_onDeleteIconClick', listener);
    }
  }, [el, onDeleteIconClick])

  return (
    <goa-chip ref={el} leadingicon={leadingIcon} error={error} deletable={!!onDeleteIconClick} content={content} />
  )
};

export default GoAChip;
