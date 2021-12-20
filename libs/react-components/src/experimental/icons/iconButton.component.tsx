import React, { FC, useEffect, useRef } from 'react'
import { TestProps } from '../common'
import { GoAIcon, IconSize, GoAIconType, IconVariant } from './icon.component';
import './icons.scss'

interface WCProps {
  ref: React.MutableRefObject<HTMLElement>;
  type: GoAIconType,
  size?: IconSize;
  variant?: IconVariant;
  title?: string;
  disabled?: boolean;
}


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-icon-button': WCProps & React.HTMLAttributes<HTMLButtonElement>
    }
  }
}

interface Props extends TestProps {
  type: GoAIconType,
  size?: IconSize;
  variant?: IconVariant;
  title?: string;
  disabled?: boolean;
  onClick: () => void;
}

export const GoAIconButton: FC<Props> = ({ type, disabled, variant = 'primary', onClick, size = 'medium', title, children }) =>  {
  const ref = useRef<HTMLElement>();
  useEffect(() => {
    const current = ref.current;
    const listener = (e: CustomEvent) => {
      console.log('in the on click')
      onClick();
    };

    current.addEventListener('on:click', listener)
    return () => {
      current.removeEventListener('on:click', listener);
    }
  }, [ref, onClick])

  return (
    <goa-icon-button ref={ref} type={type} disabled={disabled} variant={variant} size={size} title={title}>
      {children}
    </goa-icon-button>
  )
}
