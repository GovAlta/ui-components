import React, { FC, useEffect, useRef } from 'react';

interface WCProps {
  ref: React.Ref<HTMLTextAreaElement>;
  name: string;
  value: string;
  placeholder?: string;
  rows: number;
  disabled: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-textarea': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface Props {
  name: string;
  value: string;
  id?: string;
  placeholder?: string;
  rows: number;
  disabled: boolean;
  onChange: (name: string, value: string) => void;
};

export const GoATextArea: FC<Props> = ({ name, value, placeholder, rows, disabled, onChange }) => {
  const el = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener: EventListener = (e: any) => {
      const { name, value } = e.detail.data;
      onChange(name, value);
    };

    current.addEventListener('_change', listener)
    return () => {
      current.removeEventListener('_change', listener);
    }
  }, [el, onChange])

  return (
    <goa-textarea
      ref={el}
      name={name}
      placeholder={placeholder}
      value={value}
      rows={rows}
      disabled={disabled}
    >
    </goa-textarea>
  );
};

export default GoATextArea;
