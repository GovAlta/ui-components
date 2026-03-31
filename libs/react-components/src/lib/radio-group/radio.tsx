import { Margins } from "@abgov/ui-components-common";

import type { JSX } from "react";

interface WCProps extends Margins {
  name?: string;
  value?: string;
  description?: string | React.ReactNode;
  reveal?: React.ReactNode;
  revealarialabel?: string;
  label?: string;
  maxwidth?: string;
  disabled?: string;
  checked?: string;
  error?: string;
  arialabel?: string;
  compact?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-radio-item": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabRadioItemProps extends Margins {
  /** The value of this radio option. Will be emitted when selected. */
  value?: string;
  /** The display label for this radio option. Falls back to value if not provided. */
  label?: string;
  /** The name of the radio group. Inherited from the parent RadioGroup if not set. */
  name?: string;
  /** Additional description text displayed below the label. */
  description?: string | React.ReactNode;
  /** Content revealed below the radio option when it is selected. */
  reveal?: React.ReactNode;
  /** Text announced by screen readers when the reveal content is displayed. */
  revealAriaLabel?: string;
  /** Sets the maximum width of this radio item. */
  maxWidth?: string;
  /** Disables this radio option. Also disabled if the parent RadioGroup is disabled. */
  disabled?: boolean;
  /** Sets this radio option as checked/selected. */
  checked?: boolean;
  /** Shows an error state on this radio option. */
  error?: boolean;
  /** Reduces spacing for dense layouts. */
  compact?: boolean;
  /** Additional content rendered inside the radio item. */
  children?: React.ReactNode;
  /** Defines how this option will be announced by screen readers. */
  ariaLabel?: string;
}

export function GoabRadioItem({
  name,
  label,
  value,
  description,
  reveal,
  revealAriaLabel,
  maxWidth,
  disabled,
  checked,
  error,
  compact,
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
      error={error ? "true" : undefined}
      disabled={disabled ? "true" : undefined}
      checked={checked ? "true" : undefined}
      compact={compact ? "true" : undefined}
      arialabel={ariaLabel}
      revealarialabel={revealAriaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      version="2"
    >
      {description && typeof description !== "string" && (
        <div slot="description">{description}</div>
      )}
      {reveal && <div slot="reveal">{reveal}</div>}
      {children}
    </goa-radio-item>
  );
}

export default GoabRadioItem;
