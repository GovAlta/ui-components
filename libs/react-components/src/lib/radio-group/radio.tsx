import { Margins } from "@abgov/ui-components-common";

interface RadioItemProps extends Margins {
  name?: string;
  value?: string;
  description?: string | React.ReactNode;
  label?: string;
  maxwidth?: string;
  disabled?: boolean;
  checked?: boolean;
  error?: boolean;
  arialabel?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-radio-item": RadioItemProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabRadioItemProps extends Margins {
  value?: string;
  label?: string;
  name?: string;
  description?: string | React.ReactNode;
  maxWidth?: string;
  disabled?: boolean;
  checked?: boolean;
  error?: boolean;
  children?: React.ReactNode;
  testId?: string;
  ariaLabel?: string;
}

export function GoabRadioItem({
  name,
  label,
  value,
  description,
  maxWidth,
  disabled,
  checked,
  error,
  testId,
  ariaLabel,
  children,
  mt,
  mr,
  mb,
  ml,
}: GoabRadioItemProps): JSX.Element {
  return (
    <goa-radio-item
      name={name}
      label={label}
      value={value}
      description={typeof description === "string" ? description : undefined}
      maxwidth={maxWidth}
      error={error}
      disabled={disabled}
      checked={checked}
      data-testid={testId}
      arialabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {description && typeof description !== "string" && (
        <div slot="description">{description}</div>
      )}
      {children}
    </goa-radio-item>
  );
}

export default GoabRadioItem;
