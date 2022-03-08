import React, { FC, useEffect, useRef } from 'react';
import { GoAIconType } from '../..';

interface WCProps {
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  type: string;
  name: string;
  value: string;
  id?: string;
  placeholder?: string;
  leadingicon?: string;
  trailingicon?: string;
  variant: string;
  disabled?: boolean;
  error?: string;
  readonly?: boolean;
  focused?: boolean;
  handletrailingiconclick: boolean;
  testid?: string;
}


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-input': WCProps & React.HTMLAttributes<HTMLInputElement>
    }
  }
}


export interface Props {
  // required
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;

  // optional
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  leadingIcon?: GoAIconType;
  trailingIcon?: GoAIconType;
  onTrailingIconClick?: () => void;
  variant?: 'goa' | 'bare';
  focused?: boolean;
  readonly?: boolean;
  error?: string;
  testId?: string;
};

export const GoAInput: FC<Props & { type: string }> = ({
  id,
  name,
  type,
  leadingIcon,
  trailingIcon,
  variant = 'goa',
  focused,
  disabled,
  readonly,
  value,
  placeholder,
  error,
  testId,
  onTrailingIconClick,
  onChange,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const changeListener = (e: any) => {
      const { name, value } = e.detail;
      onChange(name, value);
    };
    const clickListener = (e: any) => {
      onTrailingIconClick?.();
    };

    current.addEventListener('_change', changeListener)
    current.addEventListener('_trailingIconClick', clickListener)
    return () => {
      current.removeEventListener('_change', changeListener);
      current.removeEventListener('_trailingIconClick', clickListener);
    }
  }, [ref, onChange, onTrailingIconClick])

  return (
    <goa-input ref={ref} focused={focused} type={type} name={name} id={id} leadingicon={leadingIcon} trailingicon={trailingIcon} variant={variant} disabled={disabled} readonly={readonly} placeholder={placeholder} error={error} data-testid={testId} value={value} handletrailingiconclick={!!onTrailingIconClick} />
  );
};

export const GoAInputText: FC<Props> = (props) => {
  return <GoAInput {...props} type="text" />;
}

export const GoAInputPassword: FC<Props> = (props) => {
  return <GoAInput {...props} type="password" />;
}

export const GoAInputDate: FC<Props & { min?: string, max?: string }> = (props) => {
  return <GoAInput {...props} type="date" />;
}

export const GoAInputTime: FC<Props> = (props) => {
  return <GoAInput {...props} type="time" />;
}

export const GoAInputDateTime: FC<Props & { min?: string, max?: string }> = (props) => {
  return <GoAInput {...props} type="datetime-local" />;
}

export const GoAInputEmail: FC<Props> = (props) => {
  return <GoAInput {...props} type="email" />;
}

export const GoAInputSearch: FC<Props> = (props) => {
  return <GoAInput {...props} type="text" trailingIcon="search" />;
}

export const GoAInputUrl: FC<Props> = (props) => {
  return <GoAInput {...props} type="url" />;
}

export const GoAInputTel: FC<Props> = (props) => {
  return <GoAInput {...props} type="tel" />;
}

export const GoAInputFile: FC<Props> = (props) => {
  return <input id={props.id} name={props.name} type="file" onChange={(e) => props.onChange(e.target.name, e.target.value)} style={{ backgroundColor: 'revert' }} />;
}

export const GoAInputMonth: FC<Props> = (props) => {
  return <GoAInput {...props} type="month" />;
}

export const GoAInputNumber: FC<Props & { min?: number, max?: number, step?: number }> = (props) => {
  return <GoAInput {...props} type="number" />;
}

export const GoAInputRange: FC<Props & { min?: number, max?: number, step?: number }> = ({ step = 1, ...props }) => {
  return <GoAInput {...props} type="range" />;
}

export default GoAInput;
