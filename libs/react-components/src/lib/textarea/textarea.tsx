import {
  GoabTextAreaCountBy,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
  GoabTextAreaOnBlurDetail,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
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

export interface GoabTextAreaProps extends Margins, DataAttributes {
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
  readOnly,
  disabled,
  error,
  onChange,
  onKeyPress,
  onBlur,
  ...rest
}: GoabTextAreaProps): JSX.Element {
  const el = useRef<HTMLTextAreaElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;

    const changeListener: EventListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabTextAreaOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };

    const keypressListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabTextAreaOnKeyPressDetail>).detail;
      onKeyPress?.({ ...detail, event: e as Event });
    };

    const blurListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabTextAreaOnBlurDetail>).detail;
      onBlur?.({ ...detail, event: e as Event });
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
      readOnly={readOnly ? "true" : undefined}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      {..._props}
    ></goa-textarea>
  );
}

export default GoabTextArea;
