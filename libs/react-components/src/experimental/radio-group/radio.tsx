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

export interface GoabxRadioItemProps extends Margins {
  /** The currently selected value in the radio group. */
  value?: string;
  label?: string;
  /** The name for the radio group. Used for accessibility and change events. */
  name?: string;
  /** TO REVIEW: Descriptive content shown below the label. Accepts a string or a custom template for rich content. */
  description?: string | React.ReactNode;
  /** TO REVIEW: Additional content that is revealed when the item is checked or selected. */
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
  compact?: boolean;
  /** TO REVIEW: Radio item elements rendered inside the radio group. */
  children?: React.ReactNode;
  /**
   * Defines how the radio group will be announced by screen readers.
   * @default ""
   */
  ariaLabel?: string;
  version?: string;
}

export function GoabxRadioItem({
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
  version = "2",
  mt,
  mr,
  mb,
  ml,
}: GoabxRadioItemProps): JSX.Element {
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
      version={version}
    >
      {description && typeof description !== "string" && (
        <div slot="description">{description}</div>
      )}
      {reveal && <div slot="reveal">{reveal}</div>}
      {children}
    </goa-radio-item>
  );
}

export default GoabxRadioItem;
