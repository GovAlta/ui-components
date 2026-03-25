import { DataAttributes, GoabCheckboxOnChangeDetail, Margins } from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  id?: string;
  name: string;
  checked?: string;
  indeterminate?: string;
  disabled?: string;
  error?: string;
  text?: string;
  value?: string | number;
  arialabel?: string;
  description?: string | React.ReactNode;
  reveal?: React.ReactNode;
  revealarialabel?: string;
  maxwidth?: string;
  testid?: string;
}

/* eslint-disable-next-line */
export interface GoabCheckboxProps extends Margins, DataAttributes {
  id?: string;
  /** Unique name to identify the checkbox. */
  name: string;
  /**
   * Marks the checkbox item as selected.
   * @default false
   */
  checked?: boolean;
  /**
   * Shows a mixed/partial selection state. Used for 'Select All' checkboxes when some items are selected.
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Disable this control. It will not receive focus or events.
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows an error on the checkbox item.
   * @default false
   */
  error?: boolean;
  /**
   * Label shown beside the checkbox.
   * @default ""
   */
  text?: string;
  /**
   * The value binding.
   * @default ""
   */
  value?: string | number | boolean;
  /** TO REVIEW: Additional content rendered below the checkbox. */
  children?: React.ReactNode;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /**
   * Defines how the text will be translated for the screen reader. If not specified it will fall back to the name.
   * @default ""
   */
  ariaLabel?: string;
  /**
   * Additional description text displayed below the checkbox label.
   * @default ""
   */
  description?: string | React.ReactNode;
  /** TO REVIEW: Additional content that is revealed when the item is checked or selected. */
  reveal?: React.ReactNode;
  /**
   * Text announced by screen readers when the reveal slot content is displayed.
   * @default ""
   */
  revealAriaLabel?: string;
  /**
   * Sets the maximum width of the checkbox.
   * @default "none"
   */
  maxWidth?: string;
  onChange?: (detail: GoabCheckboxOnChangeDetail) => void;
}

// legacy
export type Props = GoabCheckboxProps;

export function GoabCheckbox({
  error,
  checked,
  indeterminate,
  disabled,
  value,
  description,
  reveal,
  onChange,
  name,
  children,
  ...rest
}: GoabCheckboxProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabCheckboxOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };

    current.addEventListener("_change", listener);

    return () => {
      current.removeEventListener("_change", listener);
    };
  }, [name, onChange]);

  return (
    <goa-checkbox
      ref={el}
      {..._props}
      name={name}
      error={error ? "true" : undefined}
      checked={checked ? "true" : undefined}
      indeterminate={indeterminate ? "true" : undefined}
      disabled={disabled ? "true" : undefined}
      value={typeof value === "boolean" ? (value ? "true" : undefined) : value}
      description={typeof description === "string" ? description : undefined}
    >
      {children}
      {typeof description !== "string" && description && (
        <div slot="description">{description}</div>
      )}
      {reveal && <div slot="reveal">{reveal}</div>}
    </goa-checkbox>
  );
}

export default GoabCheckbox;
