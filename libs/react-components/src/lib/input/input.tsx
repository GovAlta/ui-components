import { useEffect, useRef } from "react";
import { GoAIconType } from "../..";
import { format, isValid, parseISO } from "date-fns";
import { Margins } from "../../common/styling";

export type GoADate = Date | string;

export type GoAInputType =
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

export type GoAAutoCapitalize =
  | "on"
  | "off"
  | "none"
  | "sentences"
  | "words"
  | "characters";

interface WCProps extends Margins {
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  type?: GoAInputType;
  name: string;
  value: string;
  id?: string;
  autocapitalize?: GoAAutoCapitalize;
  debounce?: number;
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
  arialabel?: string;

  // type=number
  min?: string | number;
  max?: string | number;
  step?: number;
  maxlength?: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-input": WCProps & React.HTMLAttributes<HTMLInputElement>;
    }
  }
}

interface BaseProps extends Margins {
  // required
  name: string;

  // optional
  id?: string;
  debounce?: number;
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
  ariaLabel?: string;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  maxLength?: number;
}

type OnChange = (name: string, value: string) => void;
type OnFocus = (name: string, value: string) => void;
type OnBlur = (name: string, value: string) => void;
export interface GoAInputProps extends BaseProps {
  onChange: OnChange;
  value: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  onFocus?: OnFocus;
  onBlur?: OnBlur;
}

// legacy
export type InputProps = GoAInputProps;

type OnNumberChange = (name: string, value: number) => void;
type OnNumberFocus = (name: string, value: number) => void;
type OnNumberBlur = (name: string, value: number) => void;
export interface GoANumberInputProps extends BaseProps {
  onChange: OnNumberChange;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onFocus?: OnNumberFocus;
  onBlur?: OnNumberBlur;
}

type OnDateChange = (name: string, value: GoADate) => void;
type OnDateFocus = (name: string, value: GoADate) => void;
type OnDateBlur = (name: string, value: GoADate) => void;
export interface GoADateInputProps extends BaseProps {
  onChange: OnDateChange;
  value: GoADate;
  min?: GoADate;
  max?: GoADate;
  step?: number;
  onFocus?: OnDateFocus;
  onBlur?: OnDateBlur;
}

export function GoAInput({
  id,
  debounce,
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
  ariaLabel,
  mt,
  mr,
  mb,
  ml,
  leadingContent,
  trailingContent,
  maxLength,
  onTrailingIconClick,
  onChange,
  onFocus,
  onBlur,
}: GoAInputProps & { type?: GoAInputType }): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const changeListener = (e: unknown) => {
      const { name, value } = (e as CustomEvent).detail;
      onChange(name, value);
    };
    const clickListener = () => {
      onTrailingIconClick?.();
    };

    const focusListener = (e: unknown) => {
      const { name, value } = (e as CustomEvent).detail;
      onFocus?.(name, value);
    };

    const blurListener = (e: unknown) => {
      const { name, value } = (e as CustomEvent).detail;
      onBlur?.(name, value);
    };

    current.addEventListener("_change", changeListener);
    current.addEventListener("_trailingIconClick", clickListener);
    current.addEventListener("_focus", focusListener);
    current.addEventListener("_blur", blurListener);
    return () => {
      current.removeEventListener("_change", changeListener);
      current.removeEventListener("_trailingIconClick", clickListener);
      current.removeEventListener("_focus", focusListener);
      current.removeEventListener("_blur", blurListener);
    };
  }, [ref, onChange, onTrailingIconClick, onFocus, onBlur]);

  return (
    <goa-input
      ref={ref}
      debounce={debounce}
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
      maxlength={maxLength}
      prefix={prefix}
      suffix={suffix}
      arialabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      handletrailingiconclick={!!onTrailingIconClick}
    >
      {leadingContent && <div slot="leadingContent">{leadingContent}</div>}
      {trailingContent && <div slot="trailingContent">{trailingContent}</div>}
    </goa-input>
  );
};

const onDateChangeHandler = (onChange: OnDateChange) => {
  return (name: string, value: string) => {

    if (!value) {
      onChange(name, "");
      return;
    }
    if (isValid(new Date(value))) {
      onChange(name, parseISO(value));
    }
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

export function GoAInputText(props: GoAInputProps): JSX.Element {
  return <GoAInput {...props} type="text" />;
};

export function GoAInputPassword(props: GoAInputProps): JSX.Element {
  return <GoAInput {...props} type="password" />;
};

export function GoAInputDate({
  value,
  min = "",
  max = "",
  ...props
}: GoADateInputProps): JSX.Element {
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

export function GoAInputTime({
  value,
  min = "",
  max = "",
  ...props
}: GoAInputProps): JSX.Element {
  return (
    <GoAInput
      {...props}
      onChange={onTimeChangeHandler(props.onChange)}
      value={value}
      type="time"
    />
  );
};

export function GoAInputDateTime({
  value,
  min = "",
  max = "",
  ...props
}: GoADateInputProps): JSX.Element {
  return (
    <GoAInput
      {...props}
      onChange={onDateChangeHandler(props.onChange)}
      value={toString(value, "yyyy-MM-dd'T'HH:mm")}
      type="datetime-local"
    />
  );
};

export function GoAInputEmail(props: GoAInputProps): JSX.Element {
  return <GoAInput {...props} type="email" />;
};

export function GoAInputSearch(props: GoAInputProps): JSX.Element {
  return <GoAInput {...props} type="search" trailingIcon="search" />;
};

export function GoAInputUrl(props: GoAInputProps): JSX.Element {
  return <GoAInput {...props} type="url" />;
};

export function GoAInputTel(props: GoAInputProps): JSX.Element {
  return <GoAInput {...props} type="tel" />;
};

export function GoAInputFile(props: GoAInputProps): JSX.Element {
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

export function GoAInputMonth(props: GoAInputProps): JSX.Element {
  return <GoAInput {...props} type="month" />;
};

export function GoAInputNumber({
  min = Number.MIN_VALUE,
  max = Number.MAX_VALUE,
  value,
  ...props
}: GoANumberInputProps): JSX.Element {
  const onNumberChange = (name: string, value: string) => {
    props.onChange(name, parseInt(value));
  };
  const onFocus = (name: string, value: string) => {
    props.onFocus?.(name, parseInt(value));
  };
  const onBlur = (name: string, value: string) => {
    props.onBlur?.(name, parseInt(value));
  };
  return (
    <GoAInput
      {...props}
      onChange={onNumberChange}
      min={min?.toString()}
      max={max?.toString()}
      value={value.toString()}
      onFocus={onFocus}
      onBlur={onBlur}
      type="number"
    />
  );
};

export function GoAInputRange(props: GoAInputProps): JSX.Element {
  return <GoAInput {...props} type="range" />;
};

export default GoAInput;
