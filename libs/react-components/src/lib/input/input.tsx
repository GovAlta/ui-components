import React, { FC, useEffect, useRef } from 'react';
import { GoAIconType } from '../..';
import { format, parseISO } from "date-fns";

type GoAInputType =
  "text"
  | "password"
  | "email"
  | "number"
  | "date"
  | "datetime-local"
  | "month"
  | "range"
  | "search"
  | "tel"
  | "time"
  | "url"
  | "week";

type GoAAutoCapitalize = "on" | "off" | "none" | "sentences" | "words" | "characters";

interface WCProps {
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  type?: GoAInputType;
  name: string;
  value: string;
  id?: string;
  autocapitalize?: GoAAutoCapitalize;
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
  min?: string | number;
  max?: string | number;
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


interface BaseProps {
  // required
  name: string;

  // optional
  id?: string;
  disabled?: boolean;
  autoCapitalize?: GoAAutoCapitalize;
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
};

export interface InputProps extends BaseProps {
  onChange: (name: string, value: string) => void;
  value: string;
  min?: number | string;
  max?: number | string;
  step?: number;
}

interface NumberInputProps extends BaseProps {
  onChange: (name: string, value: number) => void;
  value: number;
  min?: number;
  max?: number;
  step?: number;
}

interface DateInputProps extends BaseProps {
  onChange: (name: string, value: Date) => void;
  value: string | Date;
  min?: string | Date;
  max?: string | Date;
  step?: number;
}

export const GoAInput: FC<InputProps & { type?: GoAInputType }> = ({
  id,
  name,
  type,
  autoCapitalize,
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
      autocapitalize={autoCapitalize}
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

export const GoAInputText: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="text" />;
}

export const GoAInputPassword: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="password" />;
}

export const GoAInputDate: FC<DateInputProps> = ({value, min = "", max = "", ...props}) => {
  const _format = (value: Date): string => {
    return format(value, "yyyy-MM-dd");
  }
  const _value = _format(typeof value === "string" ? parseISO(value) : value);
  const _min = min && _format(typeof min === "string" ? parseISO(min) : min);
  const _max = max && _format(typeof max === "string" ? parseISO(max) : max);

  const onDateChange = (name: string, value: string) => {
    props.onChange(name, parseISO(value)) 
  }

  return <GoAInput {...props} onChange={onDateChange} min={_min} max={_max} value={_value} type="date" />;
}

export const GoAInputTime: FC<DateInputProps> = ({value, min = "", max = "", ...props}) => {
  const onDateChange = (name: string, value: string) => {
    props.onChange(name, parseISO(value)) 
  }
  try {
    const d: Date = typeof value === "string" ? parseISO(value) : value;

    return <GoAInput {...props}onChange={onDateChange} value={format(d, "hh:mm")} type="time" />;
  } catch(e) {
    return <GoAInput {...props} onChange={onDateChange}  value={value as string} type="time" />;
  }
}

export const GoAInputDateTime: FC<DateInputProps> = ({value, min = "", max = "", ...props}) => {
  const d: Date = typeof value === "string" ? parseISO(value) : value;
  const onDateChange = (name: string, value: string) => {
    props.onChange(name, parseISO(value)) 
  }
  return <GoAInput {...props} onChange={onDateChange} value={format(d, "yyyy-MM-dd'T'hh:mm")} type="datetime-local" />;
}

export const GoAInputEmail: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="email" />;
}

export const GoAInputSearch: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="search" trailingIcon="search" />;
}

export const GoAInputUrl: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="url" />;
}

export const GoAInputTel: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="tel" />;
}

export const GoAInputFile: FC<InputProps> = (props) => {
  return <input id={props.id} name={props.name} type="file" onChange={(e) => props.onChange(e.target.name, e.target.value)} style={{ backgroundColor: 'revert' }} />;
}

export const GoAInputMonth: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="month" />;
}

export const GoAInputNumber: FC<NumberInputProps> = ({min = Number.MIN_VALUE, max= Number.MAX_VALUE, value, ...props}) => {
  const onNumberChange = (name: string, value: string) => {
    props.onChange(name, parseInt(value));
  }
  return <GoAInput {...props} onChange={onNumberChange} min={min?.toString()} max={max?.toString()} value={value.toString()} type="number" />;
}

export const GoAInputRange: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="range" />;
}

export default GoAInput;
