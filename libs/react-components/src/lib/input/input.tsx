import React, { FC, useEffect, useRef } from 'react';
import { GoAIconType } from '../..';
import { format } from "date-fns";

type GoAInputType =
  "text"
  | "number"
  | "password"
  | "email"
  | "date"
  | "datetime-local"
  | "month"
  | "range"
  | "search"
  | "tel"
  | "time"
  | "url"
  | "week";

interface WCProps {
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  type?: GoAInputType;
  name: string;
  value: string;
  id?: string;
  placeholder?: string;
  leadingicon?: string;
  trailingicon?: string;
  variant: string;
  disabled?: boolean;
  error?: boolean;
  readonly?: boolean;
  focused?: boolean;
  showcounter?: boolean;
  maxcharcount?: number;
  handletrailingiconclick: boolean;
  width?: string;
  prefix?: string;
  suffix?: string;
  testid?: string;

  // type=number
  min?: string;
  max?: string;
  step?: number;
}


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-input': WCProps & React.HTMLAttributes<HTMLInputElement>
    }
  }
}


interface Props {
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
  error?: boolean;
  width?: string;
  showCounter?: boolean;
  maxCharCount?: number;
  prefix?: string;
  suffix?: string;
  testId?: string;

  // type=number
  min?: string;
  max?: string;
  step?: number;
};

export const GoAInput: FC<Props & { type?: GoAInputType }> = ({
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
  width,
  showCounter,
  maxCharCount,
  testId,
  min,
  max,
  step,
  prefix,
  suffix,
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
    <goa-input
      ref={ref}
      focused={focused}
      type={type}
      name={name}
      id={id}
      leadingicon={leadingIcon}
      trailingicon={trailingIcon}
      variant={variant}
      disabled={disabled}
      readonly={readonly}
      placeholder={placeholder}
      error={error}
      data-testid={testId}
      value={value}
      width={width}
      min={min}
      max={max}
      step={step}
      prefix={prefix}
      suffix={suffix}
      showcounter={showCounter}
      maxcharcount={maxCharCount}
      handletrailingiconclick={!!onTrailingIconClick}
    />
  );
};

export const GoAInputText: FC<Props> = (props) => {
  return <GoAInput {...props} type="text" />;
}

export const GoAInputPassword: FC<Props> = (props) => {
  return <GoAInput {...props} type="password" />;
}

export const GoAInputDate: FC<Omit<Props, "value"> & { value: Date | string}> = ({value, min, max, ...props}) => {
  const _value: Date = typeof value === "string" ? new Date(value) : value;
  const _min = min ? format(new Date(min), "yyyy-MM-dd") : "";
  const _max = max ? format(new Date(max), "yyyy-MM-dd") : "";
  return <GoAInput {...props} min={_min} max={_max} value={format(_value, "yyyy-MM-dd")} type="date" />;
}

export const GoAInputTime: FC<Omit<Props, "value"> & { value: Date | string}> = ({value, ...props}) => {
  try {
    const d: Date = typeof value === "string" ? new Date(value) : value;
    return <GoAInput {...props} value={format(d, "hh:mm")} type="time" />;
  } catch(e) {
    return <GoAInput {...props} value={value as string} type="time" />;
  }
}

export const GoAInputDateTime: FC<
  Omit<Props, "value">
  & { value: Date}
  > = ({value, ...props}) => {

  const d: Date = typeof value === "string" ? new Date(value) : value;
  return <GoAInput {...props} value={format(d, "yyyy-MM-dd'T'hh:mm")} type="datetime-local" />;
}

export const GoAInputEmail: FC<Props> = (props) => {
  return <GoAInput {...props} type="email" />;
}

export const GoAInputSearch: FC<Props> = (props) => {
  return <GoAInput {...props} type="search" trailingIcon="search" />;
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

export const GoAInputNumber: FC<
  Omit<Props, "value" | "min" | "max"> 
  & { value: number, min?: number, max?: number}> = ({min, max, value, ...props}) => {
  return <GoAInput {...props} min={min?.toString()} max={max?.toString()} value={value.toString()} type="number" />;
}

export const GoAInputRange: FC<Props> = (props) => {
  return <GoAInput {...props} type="range" />;
}

export default GoAInput;
