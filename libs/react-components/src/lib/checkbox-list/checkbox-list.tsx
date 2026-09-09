import {
  GoabCheckboxListOnBlurDetail,
  GoabCheckboxListOnChangeDetail,
  GoabCheckboxListOnFocusDetail,
  Margins,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
  name: string;
  value?: string[];
  disabled?: string;
  error?: string;
  testid?: string;
  maxwidth?: string;
  size?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-checkbox-list": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCheckboxListProps extends Margins {
  /** @required The name for the checkbox list group. Used as group identifier in change events. */
  name: string;
  /** Array of currently selected checkbox values. */
  value?: string[];
  /** Disables all checkboxes in the list. */
  disabled?: boolean;
  /** Shows an error state on all checkboxes in the list. */
  error?: boolean;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Sets the maximum width of the checkbox list container. */
  maxWidth?: string;
  /** Sets the size of the checkbox list. 'compact' reduces spacing between items. @default "default" */
  size?: "default" | "compact";
  /** Content rendered inside the checkbox list. */
  children?: React.ReactNode;
  /** Callback fired when the selected values change. */
  onChange?: (detail: GoabCheckboxListOnChangeDetail) => void;
  /** Callback fired when focus enters any checkbox in the list. */
  onFocus?: (detail: GoabCheckboxListOnFocusDetail) => void;
  /** Callback fired when focus leaves all checkboxes in the list. */
  onBlur?: (detail: GoabCheckboxListOnBlurDetail) => void;
}

/** A multiple selection input. */
export function GoabCheckboxList({
  name,
  value = [],
  disabled,
  error,
  testId,
  maxWidth,
  size = "default",
  children,
  onChange,
  onFocus,
  onBlur,
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
      const detail = (e as CustomEvent<GoabCheckboxListOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };
    const focusListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabCheckboxListOnFocusDetail>).detail;
      onFocus?.({ ...detail, event: e });
    };
    const blurListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabCheckboxListOnBlurDetail>).detail;
      onBlur?.({ ...detail, event: e });
    };

    current.addEventListener("_change", listener);
    current.addEventListener("_focus", focusListener);
    current.addEventListener("_blur", blurListener);

    return () => {
      current.removeEventListener("_change", listener);
      current.removeEventListener("_focus", focusListener);
      current.removeEventListener("_blur", blurListener);
    };
  }, [onChange, onFocus, onBlur]);

  return (
    <goa-checkbox-list
      ref={el}
      name={name}
      value={value}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      testid={testId}
      maxwidth={maxWidth}
      size={size}
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
