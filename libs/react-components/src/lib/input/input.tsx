import React, { FC, useEffect, useRef } from "react";
import { GoAIconType } from "../..";
import { format, parseISO } from "date-fns";

export type GoADate = Date | string;

type GoAInputType =
  | "text"
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

type GoAAutoCapitalize =
  | "on"
  | "off"
  | "none"
  | "sentences"
  | "words"
  | "characters";

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
      "goa-input": WCProps & React.HTMLAttributes<HTMLInputElement>;
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
  variant?: "goa" | "bare";
  focused?: boolean;
  readonly?: boolean;
  error?: boolean;
  width?: string;
  prefix?: string;
  suffix?: string;
  testId?: string;
}

type OnChange = (name: string, value: string) => void;
export interface InputProps extends BaseProps {
  onChange: OnChange;
  value: string;
  min?: number | string;
  max?: number | string;
  step?: number;
}

type OnNumberChange = (name: string, value: number) => void;
interface NumberInputProps extends BaseProps {
  onChange: OnNumberChange;
  value: number;
  min?: number;
  max?: number;
  step?: number;
}

type OnDateChange = (name: string, value: GoADate) => void;
interface DateInputProps extends BaseProps {
  onChange: OnDateChange;
  value: GoADate;
  min?: GoADate;
  max?: GoADate;
  step?: number;
}

export const GoAInput: FC<InputProps & { type?: GoAInputType }> = ({
  id,
  name,
  type,
  autoCapitalize,
  leadingIcon,
  trailingIcon,
  variant = "goa",
  focused,
  disabled,
  readonly,
  value,
  placeholder,
  error,
  width,
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

    current.addEventListener("_change", changeListener);
    current.addEventListener("_trailingIconClick", clickListener);
    return () => {
      current.removeEventListener("_change", changeListener);
      current.removeEventListener("_trailingIconClick", clickListener);
    };
  }, [ref, onChange, onTrailingIconClick]);

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
      handletrailingiconclick={!!onTrailingIconClick}
    />
  );
};

const onDateChangeHandler = (onChange: OnDateChange) => {
  return (name: string, value: string) => {
    if (!value) {
      onChange(name, new Date(0));
      return;
    }
    onChange(name, parseISO(value));
  };
};

const onTimeChangeHandler = (onChange: OnChange) => {
  return (name: string, value: string) => {
    if (!value) {
      onChange(name, "");
      return;
    }
    onChange(name, value);
  };
};

function toDate(value: GoADate): Date {
  if (!value) {
    return new Date(0);
  }
  if (typeof value === "string") {
    return parseISO(value);
  }
  return value;
}

function toString(value: GoADate, tmpl = "yyyy-MM-dd"): string {
  if (!value) {
    return "";
  }
  if (typeof value === "string") {
    return format(parseISO(value), tmpl);
  }
  if (value.toISOString() === new Date(0).toISOString()) {
    return "";
  }
  return format(value, tmpl);
}

export const GoAInputText: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="text" />;
};

export const GoAInputPassword: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="password" />;
};

export const GoAInputDate: FC<DateInputProps> = ({
  value,
  min = "",
  max = "",
  ...props
}) => {
  return (
    <GoAInput
      {...props}
      type="date"
      onChange={onDateChangeHandler(props.onChange)}
      min={toString(min)}
      max={toString(max)}
      value={toString(value)}
    />
  );
};

export const GoAInputTime: FC<InputProps> = ({
  value,
  min = "",
  max = "",
  ...props
}) => {
  return (
    <GoAInput
      {...props}
      onChange={onTimeChangeHandler(props.onChange)}
      value={value}
      type="time"
    />
  );
};

export const GoAInputDateTime: FC<DateInputProps> = ({
  value,
  min = "",
  max = "",
  ...props
}) => {
  return (
    <GoAInput
      {...props}
      onChange={onDateChangeHandler(props.onChange)}
      value={toString(value, "yyyy-MM-dd'T'hh:mm")}
      type="datetime-local"
    />
  );
};

export const GoAInputEmail: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="email" />;
};

export const GoAInputSearch: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="search" trailingIcon="search" />;
};

export const GoAInputUrl: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="url" />;
};

export const GoAInputTel: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="tel" />;
};

export const GoAInputFile: FC<InputProps> = (props) => {
  return (
    <input
      id={props.id}
      name={props.name}
      type="file"
      onChange={(e) => props.onChange(e.target.name, e.target.value)}
      style={{ backgroundColor: "revert" }}
    />
  );
};

export const GoAInputMonth: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="month" />;
};

export const GoAInputNumber: FC<NumberInputProps> = ({
  min = Number.MIN_VALUE,
  max = Number.MAX_VALUE,
  value,
  ...props
}) => {
  const onNumberChange = (name: string, value: string) => {
    props.onChange(name, parseInt(value));
  };
  return (
    <GoAInput
      {...props}
      onChange={onNumberChange}
      min={min?.toString()}
      max={max?.toString()}
      value={value.toString()}
      type="number"
    />
  );
};

export const GoAInputRange: FC<InputProps> = (props) => {
  return <GoAInput {...props} type="range" />;
};

export default GoAInput;
