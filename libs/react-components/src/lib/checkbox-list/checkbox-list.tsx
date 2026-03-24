import {
  GoabCheckboxListOnChangeDetail,
  Margins
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";

export interface GoabCheckboxListProps extends Margins {
  /** - Manages a selected values array and synchronizes state down to child checkboxes.
- Relays form-related events (mount, set value, set/reset error, reset fields) to and from children.
Approach
- Children register themselves via a FormFieldMount event; we track them in _childRecords.
- All value and error changes flow through a small relay bus (receive/relay helpers).
- Support both slotted goa-checkbox elements and direct child component instances.
/
  import { onMount, tick } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { receive, relay, toBoolean } from "../../common/utils";
  import {
    FieldsetSetValueMsg,
    FieldsetSetValueRelayDetail,
    FieldsetSetErrorMsg,
    FieldsetResetErrorsMsg,
    FormFieldMountRelayDetail,
    FormFieldMountMsg,
    FieldsetResetFieldsMsg,
    FieldsetErrorRelayDetail,
  } from "../../types/relay-types";

  /** The name for the checkbox list group. Used as group identifier in change events. */
  name: string;
  /**
   * Array of currently selected checkbox values.
   * @default []
   */
  value?: string[];
  /**
   * Disables all checkboxes in the list.
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows an error state on all checkboxes in the list.
   * @default false
   */
  error?: boolean;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /**
   * Sets the maximum width of the checkbox list container.
   * @default "none"
   */
  maxWidth?: string;
  children?: React.ReactNode;
  onChange?: (detail: GoabCheckboxListOnChangeDetail) => void;
}

export function GoabCheckboxList({
  name,
  value = [],
  disabled,
  error,
  testId,
  maxWidth,
  children,
  onChange,
  mt,
  mr,
  mb,
  ml,
}: GoabCheckboxListProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const listener = (e: Event) => {
      try {
        const detail = (e as CustomEvent<GoabCheckboxListOnChangeDetail>).detail;
        onChange?.({ ...detail, event: e });
      } catch (error) {
        console.error("Error handling checkbox list change:", error);
      }
    };

    try {
      current.addEventListener("_change", listener);
    } catch (error) {
      console.error("Failed to attach checkbox list listener:", error);
    }

    return () => {
      try {
        current.removeEventListener("_change", listener);
      } catch (error) {
        console.error("Failed to remove checkbox list listener:", error);
      }
    };
  }, [onChange]);

  return (
    <goa-checkbox-list
      ref={el}
      name={name}
      value={value}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      testid={testId}
      maxwidth={maxWidth}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-checkbox-list>
  );
}

export default GoabCheckboxList;
