import { useEffect, useRef } from "react";
import { Margins } from "../../common/styling";


type CountBy = "character" | "word";

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
  countby?: CountBy;
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

export interface GoATextAreaProps extends Margins {
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
  countBy?: CountBy;
  maxCount?: number;

  onChange?: (name: string, value: string) => void;
  onKeyPress?: (name: string, value: string, key: string) => void;
}

export function GoATextarea({
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
}: GoATextAreaProps): JSX.Element {
  const el = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener: EventListener = (e: unknown) => {
      const { name, value } = (e as CustomEvent).detail;
      onChange?.(name, value);
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
      const { name, value, key } = (e as CustomEvent).detail;
      onKeyPress?.(name, value, key);
    }

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

export {GoATextarea as GoATextArea}
export default GoATextarea;

