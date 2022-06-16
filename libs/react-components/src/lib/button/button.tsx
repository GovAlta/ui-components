import React, { FC, ReactNode, useEffect, useRef } from 'react';
import './button.css';
import { GoAIconType } from '../icons';

export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'start';
export type ButtonSize = 'compact' | '';
export type ButtonVariant = '' | 'danger'

interface WCProps {
  type?: ButtonType;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean
  title?: string;
  leadingicon?: string;
  trailingicon?: string;
  ref: React.RefObject<HTMLElement>;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      'goa-button': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

type ButtonProps = {
  type?: ButtonType;
  title?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  leadingIcon?: GoAIconType;
  trailingIcon?: GoAIconType;
  onClick: (e: any) => void;
  children: ReactNode;
};

export const GoAButton: FC<ButtonProps> = ({
  title,
  disabled = false,
  type = 'primary',
  size = '',
  variant = '',
  leadingIcon,
  trailingIcon,
  children,
  onClick
}) => {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = (e: any) => { onClick(e); };

    current.addEventListener('_click', listener)
    return () => {
      current.removeEventListener('_click', listener);
    }
  }, [el, onClick])

  return (
    <goa-button
      ref={el}
      role="button"
      type={type}
      size={size}
      variant={variant}
      disabled={disabled}
      title={title}
      leadingicon={leadingIcon}
      trailingicon={trailingIcon}
    >
      {children}
    </goa-button>
  );
};

export default GoAButton;
