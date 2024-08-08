import {
  GoABTextAreaCountBy,
  GoABTextAreaOnChangeDetail,
  GoABTextAreaOnKeyPressDetail,
  Margins,
} from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

interface WCProps extends Margins {
  ref: React.Ref<HTMLTextAreaElement>;
  name: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  error?: boolean;
  disabled?: boolean;
  width?: string;
  maxwidth?: string;
  arialabel?: string;
  countby?: GoABTextAreaCountBy;
  maxcount?: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-textarea": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABTextAreaProps extends Margins {
  name: string;
  value?: string;
  id?: string;
  placeholder?: string;
  rows?: number;
  error?: boolean;
  disabled?: boolean;
  width?: string;
  maxWidth?: string;
  testId?: string;
  ariaLabel?: string;
  countBy?: GoABTextAreaCountBy;
  maxCount?: number;

  onChange: (event: GoABTextAreaOnChangeDetail) => void;
  onKeyPress?: (event: GoABTextAreaOnKeyPressDetail) => void;
}

export function GoABTextarea({
  name,
  value,
  placeholder,
  rows,
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
}: GoABTextAreaProps): JSX.Element {
  const el = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener: EventListener = (e: Event) => {
      const detail = (e as CustomEvent<GoABTextAreaOnChangeDetail>).detail;

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
      const detail = (e as CustomEvent<GoABTextAreaOnKeyPressDetail>).detail;
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
      disabled={disabled}
      countby={countBy}
      maxcount={maxCount}
      width={width}
      maxwidth={maxWidth}
      error={error}
      data-testid={testId}
      arialabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    ></goa-textarea>
  );
}

export { GoABTextarea as GoABTextArea };
export default GoABTextarea;
