import { useEffect, useRef, type JSX } from "react";
import { format, isValid, parseISO } from "date-fns";
import {
  GoabAutoCapitalize,
  GoabDate,
  GoabIconType,
  GoabInputOnBlurDetail,
  GoabInputOnChangeDetail,
  GoabInputOnFocusDetail,
  GoabInputOnKeyPressDetail,
  GoabInputType,
  Margins,
} from "@abgov/ui-components-common";
import { DataGridProps, useDataGridProps } from "../common/data-props";

export interface IgnoreMe {
  ignore: string;
}

interface WCProps extends Margins {
  ref?: React.RefObject<HTMLInputElement | null>;
  type?: GoabInputType;
  name: string;
  value?: string;
  id?: string;
  autocapitalize?: GoabAutoCapitalize;
  autocomplete?: string;
  debounce?: number;
  placeholder?: string;
  leadingicon?: string;
  trailingicon?: string;
  variant: string;
  disabled?: string;
  error?: string;
  readonly?: string;
  focused?: string;
  handletrailingiconclick: string;
  width?: string;
  prefix?: string;
  suffix?: string;
  arialabel?: string;
  testid?: string;
  textalign?: string;
  size?: string;

  // type=number
  min?: string | number;
  max?: string | number;
  step?: number;
  maxlength?: number;

  trailingiconarialabel?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-input": WCProps & React.HTMLAttributes<HTMLInputElement>;
    }
  }
}

interface BaseProps extends Margins, DataGridProps {
  // required
  name: string;

  // optional
  id?: string;
  debounce?: number;
  disabled?: boolean;
  autoCapitalize?: GoabAutoCapitalize;
  autoComplete?: string;
  placeholder?: string;
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
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
  trailingIconAriaLabel?: string;
  textAlign?: "left" | "right";
  size?: "compact";
}

type OnChange<T = string> = (detail: GoabInputOnChangeDetail<T>) => void;
type OnFocus<T = string> = (detail: GoabInputOnFocusDetail<T>) => void;
type OnBlur<T = string> = (detail: GoabInputOnBlurDetail<T>) => void;
type OnKeyPress<T = string> = (detail: GoabInputOnKeyPressDetail<T>) => void;

export interface GoabInputProps extends BaseProps {
  onChange?: OnChange<string>;
  value?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  onFocus?: OnFocus<string>;
  onBlur?: OnBlur<string>;
  onKeyPress?: OnKeyPress<string>;
}

interface GoabNumberInputProps extends BaseProps {
  onChange?: OnChange<number>;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onFocus?: OnFocus<number>;
  onBlur?: OnBlur<number>;
  onKeyPress?: OnKeyPress<number>;
}

interface GoabDateInputProps extends BaseProps {
  onChange?: OnChange<GoabDate>;
  value?: GoabDate;
  min?: GoabDate;
  max?: GoabDate;
  step?: number;
  onFocus?: OnFocus<GoabDate>;
  onBlur?: OnBlur<GoabDate>;
  onKeyPress?: OnKeyPress<GoabDate>;
}

export function GoabInput(props: GoabInputProps & { type?: GoabInputType }): JSX.Element {
  const [dataGridProps, {
    id,
    debounce,
    name,
    type,
    autoCapitalize,
    autoComplete,
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
    trailingIconAriaLabel,
    textAlign = "left",
    size,
    onTrailingIconClick,
    onChange,
    onFocus,
    onBlur,
    onKeyPress,
  }] = useDataGridProps(props);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const changeListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabInputOnChangeDetail>).detail;
      onChange?.(detail);
    };
    const clickListener = () => {
      onTrailingIconClick?.();
    };

    const focusListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabInputOnFocusDetail>).detail;
      onFocus?.(detail);
    };

    const blurListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabInputOnBlurDetail>).detail;
      onBlur?.(detail);
    };

    const keypressListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabInputOnKeyPressDetail>).detail;
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
      focused={focused ? "true" : undefined}
      type={type}
      name={name}
      autocapitalize={autoCapitalize}
      autocomplete={autoComplete}
      id={id}
      leadingicon={leadingIcon}
      trailingicon={trailingIcon}
      variant={variant}
      disabled={disabled ? "true" : undefined}
      readonly={readonly ? "true" : undefined}
      placeholder={placeholder}
      error={error ? "true" : undefined}
      testid={testId}
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
      handletrailingiconclick={onTrailingIconClick ? "true" : "false"}
      trailingiconarialabel={trailingIconAriaLabel}
      textalign={textAlign}
      size={size}
      version={"2"}
      {...dataGridProps}
    >
      {leadingContent && <div slot="leadingContent">{leadingContent}</div>}
      {trailingContent && <div slot="trailingContent">{trailingContent}</div>}
    </goa-input>
  );
}

const onDateChangeHandler = (onChange?: OnChange<GoabDate>) => {
  return ({ name, value }: GoabInputOnChangeDetail<string | Date>) => {
    if (!value) {
      onChange?.({ name, value: "" });
      return;
    }
    // valid string date
    if (typeof value === "string" && isValid(new Date(value))) {
      onChange?.({ name, value: parseISO(value) });
      return;
    }
    // valid date
    if (isValid(value)) {
      onChange?.({ name, value });
      return;
    }
  };
};

const onTimeChangeHandler = (onChange?: OnChange) => {
  return ({ name, value }: GoabInputOnChangeDetail) => {
    if (!value) {
      onChange?.({ name, value: "" });
      return;
    }
    onChange?.({ name, value });
  };
};

function toString(value: GoabDate | null | undefined, tmpl = "yyyy-MM-dd"): string {
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

export function GoabInputText(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="text" />;
}

export function GoabInputPassword(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="password" />;
}

export function GoabInputDate({
  value,
  min = "",
  max = "",
  ...props
}: GoabDateInputProps): JSX.Element {
  return (
    <GoabInput
      {...props}
      type="date"
      onChange={onDateChangeHandler(props.onChange)}
      min={toString(min)}
      max={toString(max)}
      value={toString(value)}
    />
  );
}

export function GoabInputTime({
  value,
  min = "",
  max = "",
  ...props
}: GoabInputProps): JSX.Element {
  return (
    <GoabInput
      {...props}
      onChange={onTimeChangeHandler(props.onChange)}
      value={value}
      type="time"
    />
  );
}

export function GoabInputDateTime({
  value,
  min = "",
  max = "",
  ...props
}: GoabDateInputProps): JSX.Element {
  return (
    <GoabInput
      {...props}
      onChange={onDateChangeHandler(props.onChange)}
      value={toString(value, "yyyy-MM-dd'T'HH:mm")}
      type="datetime-local"
    />
  );
}

export function GoabInputEmail(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="email" />;
}

export function GoabInputSearch(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="search" trailingIcon="search" />;
}

export function GoabInputUrl(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="url" />;
}

export function GoabInputTel(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="tel" />;
}

export function GoabInputFile(props: GoabInputProps): JSX.Element {
  return (
    <input
      id={props.id}
      name={props.name}
      type="file"
      onChange={(e) => props.onChange?.({ name: e.target.name, value: e.target.value })}
      style={{ backgroundColor: "revert" }}
    />
  );
}

export function GoabInputMonth(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="month" />;
}

export function GoabInputNumber({
  min = Number.MIN_VALUE,
  max = Number.MAX_VALUE,
  value,
  textAlign = "right",
  ...props
}: GoabNumberInputProps): JSX.Element {
  const onNumberChange = ({ name, value }: GoabInputOnChangeDetail) => {
    props.onChange?.({ name, value: parseFloat(value) });
  };
  const onFocus = ({ name, value }: GoabInputOnFocusDetail) => {
    props.onFocus?.({ name, value: parseFloat(value) });
  };
  const onBlur = ({ name, value }: GoabInputOnBlurDetail) => {
    props.onBlur?.({ name, value: parseFloat(value) });
  };
  const onKeyPress = ({ name, value, key }: GoabInputOnKeyPressDetail) => {
    props.onKeyPress?.({ name, value: parseFloat(value), key: parseInt(key) });
  };
  return (
    <GoabInput
      {...props}
      onChange={onNumberChange}
      min={min?.toString()}
      max={max?.toString()}
      value={value?.toString()}
      onFocus={onFocus}
      onBlur={onBlur}
      type="number"
      onKeyPress={onKeyPress}
      textAlign={textAlign}
    />
  );
}

export function GoabInputRange(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="range" />;
}

export default GoabInput;
