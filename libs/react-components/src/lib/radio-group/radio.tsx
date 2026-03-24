import { Margins } from "@abgov/ui-components-common";

import type { JSX } from "react";

export interface GoabRadioItemProps extends Margins {
  /** The currently selected value in the radio group. */
  value?: string;
  label?: string;
  /** The name for the radio group. Used for accessibility and change events. */
  name?: string;
  description?: string | React.ReactNode;
  reveal?: React.ReactNode;
  revealAriaLabel?: string;
  maxWidth?: string;
  /**
   * Disables all radio items in the group.
   * @default false
   */
  disabled?: boolean;
  checked?: boolean;
  /**
   * Shows an error state on all radio items in the group.
   * @default false
   */
  error?: boolean;
  children?: React.ReactNode;
  /**
   * Defines how the radio group will be announced by screen readers.
   * @default ""
   */
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
      arialabel={ariaLabel}
      revealarialabel={revealAriaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
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
