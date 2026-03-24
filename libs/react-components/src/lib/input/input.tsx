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
  Margins, DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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

  // type=number
  min?: string | number;
  max?: string | number;
  step?: number;
  maxlength?: number;

  trailingiconarialabel?: string;
}

interface BaseProps extends Margins, DataAttributes {
  // required
  name: string;

  // optional
  id?: string;
  /**
   * Debounce delay in milliseconds before firing the change event. 0 means no debounce.
   * @default 0
   */
  debounce?: number;
  /**
   * Disables this input. The input will not receive focus or events. Use [attr.disabled] with [formControl].
   * @default false
   */
  disabled?: boolean;
  /**
   * Controls whether and how text input is automatically capitalized as it is entered/edited by the user. This only works on mobile devices.
   * @default "off"
   */
  autoCapitalize?: GoabAutoCapitalize;
  /**
   * Specifies the autocomplete attribute for the input field.
   * @default ""
   */
  autoComplete?: string;
  /**
   * Text displayed within the input when no value is set.
   * @default ""
   */
  placeholder?: string;
  /** Icon shown to the left of the text. */
  leadingIcon?: GoabIconType;
  /** Icon shown to the right of the text. */
  trailingIcon?: GoabIconType;
  onTrailingIconClick?: () => void;
  /**
   * Sets the visual style variant. 'goa' for standard GoA styling, 'bare' for minimal styling.
   * @default "goa"
   */
  variant?: "goa" | "bare";
  /**
   * Sets the cursor focus to the input.
   * @default false
   */
  focused?: boolean;
  /**
   * Makes the input readonly.
   * @default false
   */
  readonly?: boolean;
  /**
   * Sets the input to an error state.
   * @default false
   */
  error?: boolean;
  /**
   * Sets the width of the text input area.
   * @default "30ch"
   */
  width?: string;
  /**
   * @deprecated Use leadingContent slot instead.
   * @default ""
   */
  prefix?: string;
  /**
   * @deprecated Use trailingContent slot instead.
   * @default ""
   */
  suffix?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /**
   * Defines how the input will be translated for the screen reader. If not specified it will fall back to the name.
   * @default ""
   */
  ariaLabel?: string;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  /** Defines the maximum number of characters (as UTF-16 code units) the user can enter into the input. */
  maxLength?: number;
  /**
   * Aria label for the trailing icon. Use only when the trailing icon is interactive.
   * @default ""
   */
  trailingIconAriaLabel?: string;
  /**
   * Sets the text alignment within the input field.
   * @default "left"
   */
  textAlign?: "left" | "right";
}

type OnChange<T = string> = (detail: GoabInputOnChangeDetail<T>) => void;
type OnFocus<T = string> = (detail: GoabInputOnFocusDetail<T>) => void;
type OnBlur<T = string> = (detail: GoabInputOnBlurDetail<T>) => void;
type OnKeyPress<T = string> = (detail: GoabInputOnKeyPressDetail<T>) => void;

export interface GoabInputProps extends BaseProps {
  onChange?: OnChange<string>;
  /**
   * Bound to value.
   * @default ""
   */
  value?: string;
  /**
   * A string value that supports any number, or an ISO 8601 format if using the date or datetime type.
   * @default ""
   */
  min?: number | string;
  /**
   * A string value that supports any number, or an ISO 8601 format if using the date or datetime type.
   * @default ""
   */
  max?: number | string;
  /**
   * How much a number or date should change by.
   * @default 1
   */
  step?: number;
  onFocus?: OnFocus<string>;
  onBlur?: OnBlur<string>;
  onKeyPress?: OnKeyPress<string>;
}

interface GoabNumberInputProps extends BaseProps {
  onChange?: OnChange<number>;
  /**
   * Bound to value.
   * @default ""
   */
  value?: number;
  /**
   * A string value that supports any number, or an ISO 8601 format if using the date or datetime type.
   * @default ""
   */
  min?: number;
  /**
   * A string value that supports any number, or an ISO 8601 format if using the date or datetime type.
   * @default ""
   */
  max?: number;
  /**
   * How much a number or date should change by.
   * @default 1
   */
  step?: number;
  onFocus?: OnFocus<number>;
  onBlur?: OnBlur<number>;
  onKeyPress?: OnKeyPress<number>;
}

interface GoabDateInputProps extends BaseProps {
  onChange?: OnChange<GoabDate>;
  /**
   * Bound to value.
   * @default ""
   */
  value?: GoabDate;
  /**
   * A string value that supports any number, or an ISO 8601 format if using the date or datetime type.
   * @default ""
   */
  min?: GoabDate;
  /**
   * A string value that supports any number, or an ISO 8601 format if using the date or datetime type.
   * @default ""
   */
  max?: GoabDate;
  /**
   * How much a number or date should change by.
   * @default 1
   */
  step?: number;
  onFocus?: OnFocus<GoabDate>;
  onBlur?: OnBlur<GoabDate>;
  onKeyPress?: OnKeyPress<GoabDate>;
}

export function GoabInput({
  variant = "goa",
  textAlign = "left",
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
  ...rest
}: GoabInputProps & { type?: GoabInputType }): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  const _props = transformProps<WCProps>({ variant, textalign: textAlign, ...rest }, lowercase);

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
