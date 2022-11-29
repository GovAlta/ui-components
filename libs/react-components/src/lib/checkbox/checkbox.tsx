import React, { FC, useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-checkbox": CheckboxProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface CheckboxProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  id?: string;
  name: string;
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  text?: string;
  value?: string | number | boolean;
}

/* eslint-disable-next-line */
export interface Props extends Margins {
  id?: string;
  name: string;
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  text?: string;
  value?: string | number | boolean;
  children?: React.ReactNode;
  testId?: string;
  onChange?: (name: string, checked: boolean, value: string) => void;
}

export const GoACheckbox: FC<Props> = ({
  id,
  name,
  testId,
  error,
  disabled,
  checked,
  value,
  text,
  children,
  onChange,
  mt,
  mr,
  mb,
  ml,
}) => {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = (e: unknown) => {
      const ce = e as CustomEvent;
      onChange?.(name, ce.detail.checked, ce.detail.value);
    };

    current.addEventListener("_change", listener);

    return () => {
      current.removeEventListener("_change", listener);
    };
  }, [name, onChange]);

  return (
    <goa-checkbox
      data-testid={testId}
      ref={el}
      id={id}
      name={name}
      error={error}
      checked={checked}
      disabled={disabled}
      text={text}
      value={value}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-checkbox>
  );
};

export default GoACheckbox;
