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
import { transformProps, lowercase } from "../common/extract-props";

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

  version?: string;
  trailingiconarialabel?: string;
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
  /** Name of input value that is received in event detail payloads. */
  name: string;

  /** Sets the id attribute of the input element. */
  id?: string;
  /** Debounce delay in milliseconds before firing the change event. 0 means no debounce. */
  debounce?: number;
  /** Sets the input disabled state. */
  disabled?: boolean;
  /** Controls automatic capitalization behavior on supported mobile browsers. */
  autoCapitalize?: GoabAutoCapitalize;
  /** Sets the autocomplete attribute for the input element. */
  autoComplete?: string;
  /** Sets placeholder text when the input is empty. */
  placeholder?: string;
  /** Sets the icon shown before the value. */
  leadingIcon?: GoabIconType;
  /** Sets the icon shown after the value. */
  trailingIcon?: GoabIconType;
  /** Callback fired when the trailing icon is clicked. */
  onTrailingIconClick?: () => void;
  /** Sets the visual style variant. @default "goa" */
  variant?: "goa" | "bare";
  /** Sets focus on initial render or controlled updates. */
  focused?: boolean;
  /** Sets the readonly state. */
  readonly?: boolean;
  /** Sets the error state styling. */
  error?: boolean;
  /** Sets the width of the input field. */
  width?: string;
  /** @deprecated Use leadingContent instead. */
  prefix?: string;
  /** @deprecated Use trailingContent instead. */
  suffix?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Sets the aria-label used by assistive technologies. */
  ariaLabel?: string;
  /** Sets content in the leading slot. */
  leadingContent?: React.ReactNode;
  /** Sets content in the trailing slot. */
  trailingContent?: React.ReactNode;
  /** Sets the maximum number of characters. */
  maxLength?: number;
  /** Sets the aria-label for an interactive trailing icon. */
  trailingIconAriaLabel?: string;
  /** Sets text alignment. @default "left" */
  textAlign?: "left" | "right";
  /** Sets the input size. @default "default" */
  size?: GoabInputSize;
}

type OnChange<T = string> = (detail: GoabInputOnChangeDetail<T>) => void;
type OnFocus<T = string> = (detail: GoabInputOnFocusDetail<T>) => void;
type OnBlur<T = string> = (detail: GoabInputOnBlurDetail<T>) => void;
type OnKeyPress<T = string> = (detail: GoabInputOnKeyPressDetail<T>) => void;

export interface GoabInputProps extends BaseProps {
  /** Callback fired when the input value changes. Receives GoabInputOnChangeDetail. */
  onChange?: OnChange<string>;
  /** Bound to the current value of the input field. */
  value?: string;
  /** Minimum value. Supports any number, or ISO 8601 format for date/datetime types. */
  min?: number | string;
  /** Maximum value. Supports any number, or ISO 8601 format for date/datetime types. */
  max?: number | string;
  /** How much a number or date value should change by. @default 1 */
  step?: number;
  /** Callback fired when the input receives focus. Receives GoabInputOnFocusDetail. */
  onFocus?: OnFocus<string>;
  /** Callback fired when the input loses focus. Receives GoabInputOnBlurDetail. */
  onBlur?: OnBlur<string>;
  /** Callback fired when a key is pressed in the input. Receives GoabInputOnKeyPressDetail. */
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

/** A single-line field where users can input and edit text. */
export function GoabInput({
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
  ...rest
}: GoabInputProps & { type?: GoabInputType }): JSX.Element {
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
      version="2"
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

/** A single-line field where users can input and edit text. */
export function GoabInputText(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="text" />;
}

/** A single-line field where users can enter masked password text. */
export function GoabInputPassword(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="password" />;
}

/** A single-line field where users can enter or select a date. */
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

/** A single-line field where users can enter or select a time. */
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

/** A single-line field where users can enter a date and time. */
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

/** A single-line field where users can enter an email address. */
export function GoabInputEmail(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="email" />;
}

/** A single-line field where users can enter search terms. */
export function GoabInputSearch(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="search" trailingIcon="search" />;
}

/** A single-line field where users can enter a URL. */
export function GoabInputUrl(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="url" />;
}

/** A single-line field where users can enter a phone number. */
export function GoabInputTel(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="tel" />;
}

/** A control that allows users to select a file for upload. */
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

/** A single-line field where users can enter or select a month. */
export function GoabInputMonth(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="month" />;
}

/** A single-line field where users can input and edit numeric values. */
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

/** A range input where users can choose a numeric value within minimum and maximum limits. */
export function GoabInputRange(props: GoabInputProps): JSX.Element {
  return <GoabInput {...props} type="range" />;
}

export default GoabInput;
