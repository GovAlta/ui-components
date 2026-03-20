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
  GoabInputSize,
  GoabInputType,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../../lib/common/extract-props";

export interface IgnoreMe {
  ignore: string;
}

interface WCProps extends Margins {
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
  size?: GoabInputSize;

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
      "goa-input": WCProps &
        React.HTMLAttributes<HTMLInputElement> & {
          ref?: React.RefObject<HTMLInputElement | null>;
        };
    }
  }
}

interface BaseProps extends Margins, DataAttributes {
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
  size?: GoabInputSize;
  version?: string;
}

type OnChange<T = string> = (detail: GoabInputOnChangeDetail<T>) => void;
type OnFocus<T = string> = (detail: GoabInputOnFocusDetail<T>) => void;
type OnBlur<T = string> = (detail: GoabInputOnBlurDetail<T>) => void;
type OnKeyPress<T = string> = (detail: GoabInputOnKeyPressDetail<T>) => void;

export interface GoabxInputProps extends BaseProps {
  onChange?: OnChange<string>;
  value?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  onFocus?: OnFocus<string>;
  onBlur?: OnBlur<string>;
  onKeyPress?: OnKeyPress<string>;
}

interface GoabxNumberInputProps extends BaseProps {
  onChange?: OnChange<number>;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onFocus?: OnFocus<number>;
  onBlur?: OnBlur<number>;
  onKeyPress?: OnKeyPress<number>;
}

interface GoabxDateInputProps extends BaseProps {
  onChange?: OnChange<GoabDate>;
  value?: GoabDate;
  min?: GoabDate;
  max?: GoabDate;
  step?: number;
  onFocus?: OnFocus<GoabDate>;
  onBlur?: OnBlur<GoabDate>;
  onKeyPress?: OnKeyPress<GoabDate>;
}

export function GoabxInput({
  variant = "goa",
  textAlign = "left",
  size = "default",
  focused,
  disabled,
  readonly,
  error,
  leadingContent,
  trailingContent,
  onTrailingIconClick,
  onChange,
  onFocus,
  onBlur,
  onKeyPress,
  version = "2",
  ...rest
}: GoabxInputProps & { type?: GoabInputType }): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  const _props = transformProps<WCProps>(
    { variant, textalign: textAlign, size, ...rest },
    lowercase,
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const current = ref.current;
    const changeListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabInputOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };
    const clickListener = () => {
      onTrailingIconClick?.();
    };

    const focusListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabInputOnFocusDetail>).detail;
      onFocus?.({ ...detail, event: e });
    };

    const blurListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabInputOnBlurDetail>).detail;
      onBlur?.({ ...detail, event: e });
    };

    const keypressListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabInputOnKeyPressDetail>).detail;
      onKeyPress?.({ ...detail, event: e });
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
      {..._props}
      focused={focused ? "true" : undefined}
      disabled={disabled ? "true" : undefined}
      readonly={readonly ? "true" : undefined}
      error={error ? "true" : undefined}
      handletrailingiconclick={onTrailingIconClick ? "true" : "false"}
      version={version}
    >
      {leadingContent && <div slot="leadingContent">{leadingContent}</div>}
      {trailingContent && <div slot="trailingContent">{trailingContent}</div>}
    </goa-input>
  );
}

const onDateChangeHandler = (onChange?: OnChange<GoabDate>) => {
  return ({ name, value, event }: GoabInputOnChangeDetail<string | Date>) => {
    if (!value) {
      onChange?.({ name, value: "", event });
      return;
    }
    // valid string date
    if (typeof value === "string" && isValid(new Date(value))) {
      onChange?.({ name, value: parseISO(value), event });
      return;
    }
    // valid date
    if (isValid(value)) {
      onChange?.({ name, value, event });
      return;
    }
  };
};

const onTimeChangeHandler = (onChange?: OnChange) => {
  return ({ name, value, event }: GoabInputOnChangeDetail) => {
    if (!value) {
      onChange?.({ name, value: "", event });
      return;
    }
    onChange?.({ name, value, event });
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

export function GoabxInputText(props: GoabxInputProps): JSX.Element {
  return <GoabxInput {...props} type="text" />;
}

export function GoabxInputPassword(props: GoabxInputProps): JSX.Element {
  return <GoabxInput {...props} type="password" />;
}

export function GoabxInputDate({
  value,
  min = "",
  max = "",
  ...props
}: GoabxDateInputProps): JSX.Element {
  return (
    <GoabxInput
      {...props}
      type="date"
      onChange={onDateChangeHandler(props.onChange)}
      min={toString(min)}
      max={toString(max)}
      value={toString(value)}
    />
  );
}

export function GoabxInputTime({
  value,
  min = "",
  max = "",
  ...props
}: GoabxInputProps): JSX.Element {
  return (
    <GoabxInput
      {...props}
      onChange={onTimeChangeHandler(props.onChange)}
      value={value}
      type="time"
    />
  );
}

export function GoabxInputDateTime({
  value,
  min = "",
  max = "",
  ...props
}: GoabxDateInputProps): JSX.Element {
  return (
    <GoabxInput
      {...props}
      onChange={onDateChangeHandler(props.onChange)}
      value={toString(value, "yyyy-MM-dd'T'HH:mm")}
      type="datetime-local"
    />
  );
}

export function GoabxInputEmail(props: GoabxInputProps): JSX.Element {
  return <GoabxInput {...props} type="email" />;
}

export function GoabxInputSearch(props: GoabxInputProps): JSX.Element {
  return <GoabxInput {...props} type="search" trailingIcon="search" />;
}

export function GoabxInputUrl(props: GoabxInputProps): JSX.Element {
  return <GoabxInput {...props} type="url" />;
}

export function GoabxInputTel(props: GoabxInputProps): JSX.Element {
  return <GoabxInput {...props} type="tel" />;
}

export function GoabxInputFile(props: GoabxInputProps): JSX.Element {
  return (
    <input
      id={props.id}
      name={props.name}
      type="file"
      onChange={(e) =>
        props.onChange?.({
          name: e.target.name,
          value: e.target.value,
          event: e.nativeEvent,
        })
      }
      style={{ backgroundColor: "revert" }}
    />
  );
}

export function GoabxInputMonth(props: GoabxInputProps): JSX.Element {
  return <GoabxInput {...props} type="month" />;
}

export function GoabxInputNumber({
  min = Number.MIN_VALUE,
  max = Number.MAX_VALUE,
  value,
  textAlign = "right",
  ...props
}: GoabxNumberInputProps): JSX.Element {
  const onNumberChange = ({ name, value, event }: GoabInputOnChangeDetail) => {
    props.onChange?.({ name, value: parseFloat(value), event });
  };
  const onFocus = ({ name, value, event }: GoabInputOnFocusDetail) => {
    props.onFocus?.({ name, value: parseFloat(value), event });
  };
  const onBlur = ({ name, value, event }: GoabInputOnBlurDetail) => {
    props.onBlur?.({ name, value: parseFloat(value), event });
  };
  const onKeyPress = ({ name, value, key, event }: GoabInputOnKeyPressDetail) => {
    props.onKeyPress?.({ name, value: parseFloat(value), key: parseInt(key), event });
  };
  return (
    <GoabxInput
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

export function GoabxInputRange(props: GoabxInputProps): JSX.Element {
  return <GoabxInput {...props} type="range" />;
}

export default GoabxInput;
