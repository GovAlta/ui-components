interface RadioItemProps {
  name?: string;
  value?: string;
  description?: string;
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  error?: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-radio-item": RadioItemProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoARadioItemProps {
  value?: string;
  label?: string;
  name?: string;
  description?: string;
  disabled?: boolean;
  checked?: boolean;
  error?: boolean;
  children?: React.ReactNode;
  testId?: string;
}

export function GoARadioItem({
  name,
  label,
  value,
  description,
  disabled,
  checked,
  error,
  testId,
  children,
}: GoARadioItemProps): JSX.Element {
  return (
    <goa-radio-item
      name={name}
      label={label}
      value={value}
      description={description}
      error={error}
      disabled={disabled}
      checked={checked}
      data-testid={testId}
    >
      {children}
    </goa-radio-item>
  );
};

export default GoARadioItem;
