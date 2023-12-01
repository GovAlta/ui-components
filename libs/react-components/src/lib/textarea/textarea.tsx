import { useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

interface WCProps extends Margins {
  ref: React.Ref<HTMLTextAreaElement>;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  error?: boolean;
  disabled?: boolean;
  showcounter?: boolean;
  maxcharcount?: number;
  width?: string;
  arialabel?: string;
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
  value: string;
  id?: string;
  placeholder?: string;
  rows?: number;
  error?: boolean;
  disabled?: boolean;
  showCounter?: boolean;
  maxCharCount?: number;
  width?: string;
  testId?: string;
  ariaLabel?: string;
  onChange: (name: string, value: string) => void;
}

export function GoATextarea({
  name,
  value,
  placeholder,
  rows,
  disabled,
  showCounter,
  maxCharCount,
  width,
  testId,
  error,
  ariaLabel,
  mt,
  mr,
  mb,
  ml,
  onChange,
}: GoATextAreaProps): JSX.Element {
  const el = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener: EventListener = (e: unknown) => {
      const { name, value } = (e as CustomEvent).detail;
      onChange(name, value);
    };

    current.addEventListener("_change", listener);
    return () => {
      current.removeEventListener("_change", listener);
    };
  }, [el, onChange]);

  return (
    <goa-textarea
      ref={el}
      name={name}
      placeholder={placeholder}
      value={value}
      rows={rows}
      disabled={disabled}
      showcounter={showCounter}
      maxcharcount={maxCharCount}
      width={width}
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

