import { useEffect, useRef } from "react";
import { format, isValid, parseISO } from "date-fns";
import { ABGovAutoCapitalize, ABGovDate, ABGovIconType, ABGovInputOnBlurDetail, ABGovInputOnChangeDetail, ABGovInputOnFocusDetail, ABGovInputOnKeyPressDetail, ABGovInputType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  type?: ABGovInputType;
  name: string;
  value?: string;
  id?: string;
  autocapitalize?: ABGovAutoCapitalize;
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
  autoCapitalize?: ABGovAutoCapitalize;
  placeholder?: string;
  leadingIcon?: ABGovIconType;
  trailingIcon?: ABGovIconType;
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

type OnChange<T = string> = (detail: ABGovInputOnChangeDetail<T>) => void;
type OnFocus<T = string> = (detail: ABGovInputOnFocusDetail<T>) => void;
type OnBlur<T = string> = (detail: ABGovInputOnBlurDetail<T>) => void;
type OnKeyPress<T = string> = (detail: ABGovInputOnKeyPressDetail<T>) => void;

export interface ABGovInputProps extends BaseProps {
  onChange: OnChange<string>;
  value?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  onFocus?: OnFocus<string>;
  onBlur?: OnBlur<string>;
  onKeyPress?: OnKeyPress<string>;
}

interface ABGovNumberInputProps extends BaseProps {
  onChange: OnChange<number>;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onFocus?: OnFocus<number>;
  onBlur?: OnBlur<number>;
  onKeyPress?: OnKeyPress<number>;
}

interface ABGovDateInputProps extends BaseProps {
  onChange: OnChange<ABGovDate>;
  value?: ABGovDate;
  min?: ABGovDate;
  max?: ABGovDate;
  step?: number;
  onFocus?: OnFocus<ABGovDate>;
  onBlur?: OnBlur<ABGovDate>;
  onKeyPress?: OnKeyPress<ABGovDate>;
}

export function ABGovInput({
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
}: ABGovInputProps & { type?: ABGovInputType }): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const changeListener = (e: Event) => {
      const detail = (e as CustomEvent<ABGovInputOnChangeDetail>).detail;
      onChange(detail);
    };
    const clickListener = () => {
      onTrailingIconClick?.();
    };

    const focusListener = (e: Event) => {
      const detail = (e as CustomEvent<ABGovInputOnFocusDetail>).detail;
      onFocus?.(detail);
    };

    const blurListener = (e: Event) => {
      const detail = (e as CustomEvent<ABGovInputOnBlurDetail>).detail;
      onBlur?.(detail);
    };

    const keypressListener = (e: Event) => {
      const detail = (e as CustomEvent<ABGovInputOnKeyPressDetail>).detail;
      onKeyPress?.(detail);
    }

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

const onDateChangeHandler = (onChange: OnChange<ABGovDate>) => {
  return ({ name, value }: ABGovInputOnChangeDetail<string | Date>) => {
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
  return ({ name, value }: ABGovInputOnChangeDetail) => {
    if (!value) {
      onChange({ name, value: "" });
      return;
    }
    onChange({ name, value });
  };
};

function toString(value: ABGovDate | null | undefined, tmpl = "yyyy-MM-dd"): string {
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

export function ABGovInputText(props: ABGovInputProps): JSX.Element {
  return <ABGovInput {...props} type="text" />;
}

export function ABGovInputPassword(props: ABGovInputProps): JSX.Element {
  return <ABGovInput {...props} type="password" />;
}

export function ABGovInputDate({
  value,
  min = "",
  max = "",
  ...props
}: ABGovDateInputProps): JSX.Element {
  return (
    <ABGovInput
      {...props}
      type="date"
      onChange={onDateChangeHandler(props.onChange)}
      min={toString(min)}
      max={toString(max)}
      value={toString(value)}
    />
  );
}

export function ABGovInputTime({
  value,
  min = "",
  max = "",
  ...props
}: ABGovInputProps): JSX.Element {
  return (
    <ABGovInput
      {...props}
      onChange={onTimeChangeHandler(props.onChange)}
      value={value}
      type="time"
    />
  );
}

export function ABGovInputDateTime({
  value,
  min = "",
  max = "",
  ...props
}: ABGovDateInputProps): JSX.Element {
  return (
    <ABGovInput
      {...props}
      onChange={onDateChangeHandler(props.onChange)}
      value={toString(value, "yyyy-MM-dd'T'HH:mm")}
      type="datetime-local"
    />
  );
}

export function ABGovInputEmail(props: ABGovInputProps): JSX.Element {
  return <ABGovInput {...props} type="email" />;
}

export function ABGovInputSearch(props: ABGovInputProps): JSX.Element {
  return <ABGovInput {...props} type="search" trailingIcon="search" />;
}

export function ABGovInputUrl(props: ABGovInputProps): JSX.Element {
  return <ABGovInput {...props} type="url" />;
}

export function ABGovInputTel(props: ABGovInputProps): JSX.Element {
  return <ABGovInput {...props} type="tel" />;
}

export function ABGovInputFile(props: ABGovInputProps): JSX.Element {
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

export function ABGovInputMonth(props: ABGovInputProps): JSX.Element {
  return <ABGovInput {...props} type="month" />;
}

export function ABGovInputNumber({
  min = Number.MIN_VALUE,
  max = Number.MAX_VALUE,
  value,
  ...props
}: ABGovNumberInputProps): JSX.Element {
  const onNumberChange = ({ name, value }: ABGovInputOnChangeDetail) => {
    props.onChange({ name, value: parseFloat(value) });
  };
  const onFocus = ({ name, value }: ABGovInputOnFocusDetail) => {
    props.onFocus?.({ name, value: parseFloat(value) });
  };
  const onBlur = ({ name, value }: ABGovInputOnBlurDetail) => {
    props.onBlur?.({ name, value: parseFloat(value) });
  };
  const onKeyPress = ({ name, value, key }: ABGovInputOnKeyPressDetail) => {
    props.onKeyPress?.({ name, value: parseFloat(value), key: parseInt(key) });
  };
  return (
    <ABGovInput
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

export function ABGovInputRange(props: ABGovInputProps): JSX.Element {
  return <ABGovInput {...props} type="range" />;
}

export default ABGovInput;
