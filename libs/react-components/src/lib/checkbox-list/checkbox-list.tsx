import { GoabCheckboxListOnChangeDetail, Margins } from "@abgov/ui-components-common";
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

export default GoabCheckboxList;
