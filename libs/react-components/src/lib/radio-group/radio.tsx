interface RadioItemProps {
  name?: string;
  value?: string;
  description?: string | React.ReactNode;
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

export interface GoABRadioItemProps {
  value?: string;
  label?: string;
  name?: string;
  description?: string | React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  error?: boolean;
  children?: React.ReactNode;
  testId?: string;
}

export function GoABRadioItem({
  name,
  label,
  value,
  description,
  disabled,
  checked,
  error,
  testId,
  children,
}: GoABRadioItemProps): JSX.Element {
  return (
    <goa-radio-item
      name={name}
      label={label}
      value={value}
      description={typeof description === "string" ? description : undefined}
      error={error}
      disabled={disabled}
      checked={checked}
      data-testid={testId}
    >
      {description && typeof description !== "string" && (
        <div slot="description">{description}</div>
      )}
      {children}
    </goa-radio-item>
  );
}

export default GoABRadioItem;
