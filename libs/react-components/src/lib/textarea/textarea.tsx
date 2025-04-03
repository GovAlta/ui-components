import {
  GoabTextAreaCountBy,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
  Margins,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { toOptionalBooleanAsString } from "../../utils";

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

  onChange: (event: GoabTextAreaOnChangeDetail) => void;
  onKeyPress?: (event: GoabTextAreaOnKeyPressDetail) => void;
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
  onChange,
  onKeyPress,
}: GoabTextAreaProps): JSX.Element {
  const el = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener: EventListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabTextAreaOnChangeDetail>).detail;

      onChange(detail);
    };

    current.addEventListener("_change", listener);
    return () => {
      current.removeEventListener("_change", listener);
    };
  }, [el, onChange]);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const keypressListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabTextAreaOnKeyPressDetail>).detail;
      onKeyPress?.(detail);
    };

    current.addEventListener("_keyPress", keypressListener);
    return () => {
      current.removeEventListener("_keyPress", keypressListener);
    };
  }, [el, onKeyPress]);

  return (
    <goa-textarea
      ref={el}
      name={name}
      placeholder={placeholder}
      value={value}
      rows={rows}
      readOnly={toOptionalBooleanAsString(readOnly)}
      disabled={toOptionalBooleanAsString(disabled, { omitIfFalse: true })}
      countby={countBy}
      maxcount={maxCount}
      width={width}
      maxwidth={maxWidth}
      error={toOptionalBooleanAsString(error)}
      testid={testId}
      arialabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    ></goa-textarea>
  );
}

export default GoabTextArea;
