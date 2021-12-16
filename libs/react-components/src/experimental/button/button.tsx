import React, { FC, ReactNode, useEffect, useRef } from 'react';
import './button.css';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'borderless';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'default' | 'danger'


interface WCProps {
  type?: ButtonType;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean
  title: string;
  ref: React.MutableRefObject<HTMLElement>;
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
  onClick: () => void;
  children: ReactNode;
};

export const GoAButton: FC<ButtonProps> = ({ title, disabled = false, type = 'primary', size = 'medium', variant = 'default', children, onClick }) => {
  const el = useRef<HTMLElement>();
  useEffect(() => {
    const current = el.current;
    const listener = (e: CustomEvent) => {
      onClick();
    };

    current.addEventListener('on:change', listener)
    return () => {
      current.removeEventListener('on:change', listener);
    }
  }, [el, onClick])

  return (
    <goa-button ref={el} type={type} size={size} variant={variant} disabled={disabled} title={title}>
      {children}
    </goa-button>
  );
};

export default GoAButton;
