import { useEffect, useRef } from "react";
import { format, isValid, parseISO } from "date-fns";
import {
  GoABAutoCapitalize,
  GoABDate,
  GoABIconType,
  GoABInputOnBlurDetail,
  GoABInputOnChangeDetail,
  GoABInputOnFocusDetail,
  GoABInputOnKeyPressDetail,
  GoABInputType,
  Margins,
} from "@abgov/ui-components-common";

interface WCProps extends Margins {
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  type?: GoABInputType;
  name: string;
  value?: string;
  id?: string;
  autocapitalize?: GoABAutoCapitalize;
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
  autoCapitalize?: GoABAutoCapitalize;
  placeholder?: string;
  leadingIcon?: GoABIconType;
  trailingIcon?: GoABIconType;
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

type OnChange<T = string> = (detail: GoABInputOnChangeDetail<T>) => void;
type OnFocus<T = string> = (detail: GoABInputOnFocusDetail<T>) => void;
type OnBlur<T = string> = (detail: GoABInputOnBlurDetail<T>) => void;
type OnKeyPress<T = string> = (detail: GoABInputOnKeyPressDetail<T>) => void;

export interface GoABInputProps extends BaseProps {
  onChange: OnChange<string>;
  value?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  onFocus?: OnFocus<string>;
  onBlur?: OnBlur<string>;
  onKeyPress?: OnKeyPress<string>;
}

interface GoABNumberInputProps extends BaseProps {
  onChange: OnChange<number>;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onFocus?: OnFocus<number>;
  onBlur?: OnBlur<number>;
  onKeyPress?: OnKeyPress<number>;
}

interface GoABDateInputProps extends BaseProps {
  onChange: OnChange<GoABDate>;
  value?: GoABDate;
  min?: GoABDate;
  max?: GoABDate;
  step?: number;
  onFocus?: OnFocus<GoABDate>;
  onBlur?: OnBlur<GoABDate>;
  onKeyPress?: OnKeyPress<GoABDate>;
}

export function GoABInput({
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
  onKeyPress,
}: GoABInputProps & { type?: GoABInputType }): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const changeListener = (e: Event) => {
      const detail = (e as CustomEvent<GoABInputOnChangeDetail>).detail;
      onChange(detail);
    };
    const clickListener = () => {
      onTrailingIconClick?.();
    };

    const focusListener = (e: Event) => {
      const detail = (e as CustomEvent<GoABInputOnFocusDetail>).detail;
      onFocus?.(detail);
    };

    const blurListener = (e: Event) => {
      const detail = (e as CustomEvent<GoABInputOnBlurDetail>).detail;
      onBlur?.(detail);
    };

    const keypressListener = (e: Event) => {
      const detail = (e as CustomEvent<GoABInputOnKeyPressDetail>).detail;
      onKeyPress?.(detail);
    };

    current.addEventListener("_change", changeListener);
    current.addEventListener("_trailingIconClick", clickListener);
    current.addEventListener("_focus", focusListener);
    current.addEventListener("_blur", blurListener);
    current.addEventListener("_keyPress", keypressListener);

    return () => {
      current.removeEventListener("_change", changeListener);
      current.removeEventListener("_trailingIconClick", clickListener);
      current.removeEventListener("_focus", focusListener);
      current.removeEventListener("_blur", blurListener);
      current.removeEventListener("_keyPress", keypressListener);
    };
  }, [ref, onChange, onTrailingIconClick, onFocus, onBlur, onKeyPress]);

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
}

const onDateChangeHandler = (onChange: OnChange<GoABDate>) => {
  return ({ name, value }: GoABInputOnChangeDetail<string | Date>) => {
    if (!value) {
      onChange({ name, value: "" });
      return;
    }
    // valid string date
    if (typeof value === "string" && isValid(new Date(value))) {
      onChange({ name, value: parseISO(value) });
      return;
    }
    // valid date
    if (isValid(value)) {
      onChange({ name, value });
      return;
    }
  };
};

const onTimeChangeHandler = (onChange: OnChange) => {
  return ({ name, value }: GoABInputOnChangeDetail) => {
    if (!value) {
      onChange({ name, value: "" });
      return;
    }
    onChange({ name, value });
  };
};

function toString(value: GoABDate | null | undefined, tmpl = "yyyy-MM-dd"): string {
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

export function GoABInputText(props: GoABInputProps): JSX.Element {
  return <GoABInput {...props} type="text" />;
}

export function GoABInputPassword(props: GoABInputProps): JSX.Element {
  return <GoABInput {...props} type="password" />;
}

export function GoABInputDate({
  value,
  min = "",
  max = "",
  ...props
}: GoABDateInputProps): JSX.Element {
  return (
    <GoABInput
      {...props}
      type="date"
      onChange={onDateChangeHandler(props.onChange)}
      min={toString(min)}
      max={toString(max)}
      value={toString(value)}
    />
  );
}

export function GoABInputTime({
  value,
  min = "",
  max = "",
  ...props
}: GoABInputProps): JSX.Element {
  return (
    <GoABInput
      {...props}
      onChange={onTimeChangeHandler(props.onChange)}
      value={value}
      type="time"
    />
  );
}

export function GoABInputDateTime({
  value,
  min = "",
  max = "",
  ...props
}: GoABDateInputProps): JSX.Element {
  return (
    <GoABInput
      {...props}
      onChange={onDateChangeHandler(props.onChange)}
      value={toString(value, "yyyy-MM-dd'T'HH:mm")}
      type="datetime-local"
    />
  );
}

export function GoABInputEmail(props: GoABInputProps): JSX.Element {
  return <GoABInput {...props} type="email" />;
}

export function GoABInputSearch(props: GoABInputProps): JSX.Element {
  return <GoABInput {...props} type="search" trailingIcon="search" />;
}

export function GoABInputUrl(props: GoABInputProps): JSX.Element {
  return <GoABInput {...props} type="url" />;
}

export function GoABInputTel(props: GoABInputProps): JSX.Element {
  return <GoABInput {...props} type="tel" />;
}

export function GoABInputFile(props: GoABInputProps): JSX.Element {
  return (
    <input
      id={props.id}
      name={props.name}
      type="file"
      onChange={(e) => props.onChange({ name: e.target.name, value: e.target.value })}
      style={{ backgroundColor: "revert" }}
    />
  );
}

export function GoABInputMonth(props: GoABInputProps): JSX.Element {
  return <GoABInput {...props} type="month" />;
}

export function GoABInputNumber({
  min = Number.MIN_VALUE,
  max = Number.MAX_VALUE,
  value,
  ...props
}: GoABNumberInputProps): JSX.Element {
  const onNumberChange = ({ name, value }: GoABInputOnChangeDetail) => {
    props.onChange({ name, value: parseFloat(value) });
  };
  const onFocus = ({ name, value }: GoABInputOnFocusDetail) => {
    props.onFocus?.({ name, value: parseFloat(value) });
  };
  const onBlur = ({ name, value }: GoABInputOnBlurDetail) => {
    props.onBlur?.({ name, value: parseFloat(value) });
  };
  const onKeyPress = ({ name, value, key }: GoABInputOnKeyPressDetail) => {
    props.onKeyPress?.({ name, value: parseFloat(value), key: parseInt(key) });
  };
  return (
    <GoABInput
      {...props}
      onChange={onNumberChange}
      min={min?.toString()}
      max={max?.toString()}
      value={value?.toString()}
      onFocus={onFocus}
      onBlur={onBlur}
      type="number"
      onKeyPress={onKeyPress}
    />
  );
}

export function GoABInputRange(props: GoABInputProps): JSX.Element {
  return <GoABInput {...props} type="range" />;
}

export default GoABInput;
