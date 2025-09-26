import {
  GoabTextAreaCountBy,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
  GoabTextAreaOnBlurDetail,
  Margins,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";

interface WCProps extends Margins {
  ref: React.Ref<HTMLTextAreaElement>;
  name: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  error?: string;
  readOnly?: string;
  disabled?: string;
  width?: string;
  maxwidth?: string;
  arialabel?: string;
  countby?: GoabTextAreaCountBy;
  maxcount?: number;
  autocomplete?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-textarea": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabTextAreaProps extends Margins {
  name: string;
  value?: string;
  id?: string;
  placeholder?: string;
  rows?: number;
  error?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  width?: string;
  maxWidth?: string;
  testId?: string;
  ariaLabel?: string;
  countBy?: GoabTextAreaCountBy;
  maxCount?: number;
  autoComplete?: string;

  onChange?: (event: GoabTextAreaOnChangeDetail) => void;
  onKeyPress?: (event: GoabTextAreaOnKeyPressDetail) => void;
  onBlur?: (event: GoabTextAreaOnBlurDetail) => void;
}

export function GoabTextArea({
  name,
  value,
  placeholder,
  rows,
  readOnly,
  disabled,
  countBy,
  maxCount,
  width,
  maxWidth,
  testId,
  error,
  ariaLabel,
  mt,
  mr,
  mb,
  ml,
  autoComplete,
  onChange,
  onKeyPress,
  onBlur,
}: GoabTextAreaProps): JSX.Element {
  const el = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;

    const changeListener: EventListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabTextAreaOnChangeDetail>).detail;
      onChange?.(detail);
    };

    const keypressListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabTextAreaOnKeyPressDetail>).detail;
      onKeyPress?.(detail);
    };

    const blurListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabTextAreaOnBlurDetail>).detail;
      onBlur?.(detail);
    };

    current.addEventListener("_change", changeListener);
    current.addEventListener("_keyPress", keypressListener);
    current.addEventListener("_blur", blurListener);

    return () => {
      current.removeEventListener("_change", changeListener);
      current.removeEventListener("_keyPress", keypressListener);
      current.removeEventListener("_blur", blurListener);
    };
  }, [el, onChange, onKeyPress, onBlur]);

  return (
    <goa-textarea
      ref={el}
      name={name}
      placeholder={placeholder}
      value={value}
      rows={rows}
      readOnly={readOnly ? "true" : undefined}
      disabled={disabled ? "true" : undefined}
      countby={countBy}
      maxcount={maxCount}
      width={width}
      maxwidth={maxWidth}
      error={error ? "true" : undefined}
      testid={testId}
      arialabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      autocomplete={autoComplete}
    ></goa-textarea>
  );
}

export default GoabTextArea;
