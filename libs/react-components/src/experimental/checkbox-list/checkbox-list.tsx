import {
  GoabCheckboxListOnChangeDetail,
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
  version?: string;
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

export interface GoabxCheckboxListProps extends Margins {
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
  /**
   * Sets the size of the checkbox list. 'compact' reduces spacing between items.
   * @default "default"
   */
  size?: "default" | "compact";
  children?: React.ReactNode;
  onChange?: (detail: GoabCheckboxListOnChangeDetail) => void;
}

export function GoabxCheckboxList({
  name,
  value = [],
  disabled,
  error,
  testId,
  maxWidth,
  size = "default",
  children,
  onChange,
  mt,
  mr,
  mb,
  ml,
}: GoabxCheckboxListProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabCheckboxListOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };

    current.addEventListener("_change", listener);

    return () => {
      current.removeEventListener("_change", listener);
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
      version="2"
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

export default GoabxCheckboxList;
