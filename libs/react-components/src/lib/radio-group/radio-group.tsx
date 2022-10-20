import React, { FC, useEffect, useRef } from "react";

export * from "./radio";

interface RadioGroupProps {
  ref: React.RefObject<HTMLElement>;
  name: string;
  value?: string;
  orientation: string;
  disabled: boolean;
  error: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-radio-group": RadioGroupProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props {
  name: string;
  value?: string;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  testId?: string;
  error?: boolean;
  children?: React.ReactNode;
  onChange: (name: string, value: string) => void;
}

export const GoARadioGroup: FC<Props> = ({
  name,
  value,
  children,
  orientation = "vertical",
  disabled = false,
  error = false,
  testId,
  onChange,
}) => {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const listener = (e: any) => {
      if (!onChange) {
        console.warn("Missing onChange function");
        return;
      }
      onChange(name, e.detail.value);
    };
    const currentEl = el.current;
    currentEl.addEventListener("_change", listener);
    return () => {
      currentEl.removeEventListener("_change", listener);
    };
  }, []);

  return (
    <goa-radio-group
      data-testid={testId}
      ref={el}
      name={name}
      value={value}
      orientation={orientation}
      disabled={disabled}
      error={error}
    >
      {children}
    </goa-radio-group>
  );
};

export default GoARadioGroup;
