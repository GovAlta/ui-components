import {
  GoabDropdownMultiselectOnChangeDetail,
  GoabCheckboxSize,
  GoabPopoverPosition,
  Margins,
} from "@abgov/ui-components-common";
import { ReactNode, useEffect, useRef, type JSX } from "react";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
  name: string;
  value?: string[];
  disabled?: string;
  error?: string;
  testid?: string;
  maxwidth?: string;
  size?: string;
  placeholder?: string;
  popoverposition?: string;
  popovermaxwidth?: string;
  popoverminwidth?: string;
  popoverpadded?: string;
  popoverwidth?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-dropdown-multiselect": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabDropdownMultiselectProps extends Margins {
  /** @required The name for the checkbox list group. Used as group identifier in change events. */
  name: string;
  /** Array of currently selected checkbox values. */
  value?: string[];
  /** Disables the trigger button and all checkboxes. */
  disabled?: boolean;
  /** Shows an error state on the trigger and all checkboxes. */
  error?: boolean;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Sets the maximum width of the checkbox list inside the popover. */
  maxWidth?: string;
  /** Sets the size of the checkbox list. 'compact' reduces spacing between items. @default "default" */
  size?: GoabCheckboxSize;
  /** Sets the placeholder text shown in the trigger when no values are selected. */
  placeholder?: string;
  /** Provides control to where the popover content is positioned. @default "auto" */
  popoverPosition?: GoabPopoverPosition;
  /** Sets the maximum width of the popover container. @default "320px" */
  popoverMaxWidth?: string;
  /** Sets the minimum width of the popover container. */
  popoverMinWidth?: string;
  /** Sets if the popover has padding. @default true */
  popoverPadded?: boolean;
  /** Sets a fixed width for the popover container. */
  popoverWidth?: string;
  /** Content rendered inside the checkbox list (goa-checkbox elements). */
  children?: ReactNode;
  /** Callback fired when the selected values change. */
  onChange?: (detail: GoabDropdownMultiselectOnChangeDetail) => void;
  /** Callback fired when the popover opens. */
  onPopoverOpen?: () => void;
  /** Callback fired when the popover closes. */
  onPopoverClose?: () => void;
}

/** A multiselect dropdown that combines a Popover trigger with a CheckboxList. */
export function GoabDropdownMultiselect({
  name,
  value = [],
  disabled,
  error,
  testId,
  maxWidth,
  size = "default",
  placeholder,
  popoverPosition,
  popoverMaxWidth,
  popoverMinWidth,
  popoverPadded,
  popoverWidth,
  children,
  onChange,
  onPopoverOpen,
  onPopoverClose,
  mt,
  mr,
  mb,
  ml,
}: GoabDropdownMultiselectProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;
    const current = el.current;

    const changeListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabDropdownMultiselectOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };
    const openListener = () => onPopoverOpen?.();
    const closeListener = () => onPopoverClose?.();

    current.addEventListener("_change", changeListener);
    current.addEventListener("_popoveropen", openListener);
    current.addEventListener("_popoverclose", closeListener);

    return () => {
      current.removeEventListener("_change", changeListener);
      current.removeEventListener("_popoveropen", openListener);
      current.removeEventListener("_popoverclose", closeListener);
    };
  }, [onChange, onPopoverOpen, onPopoverClose]);

  return (
    <goa-dropdown-multiselect
      ref={el}
      name={name}
      value={value}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      testid={testId}
      maxwidth={maxWidth}
      size={size}
      placeholder={placeholder}
      popoverposition={popoverPosition}
      popovermaxwidth={popoverMaxWidth}
      popoverminwidth={popoverMinWidth}
      popoverpadded={
        typeof popoverPadded === "undefined"
          ? undefined
          : popoverPadded
            ? "true"
            : "false"
      }
      popoverwidth={popoverWidth}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-dropdown-multiselect>
  );
}

export default GoabDropdownMultiselect;
