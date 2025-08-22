import {
  GoabCheckboxListOnChangeDetail,
  Margins,
  Spacing,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-checkbox-list": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
  name: string;
  value?: string[];
  disabled?: string;
  error?: string;
  testid?: string;
  arialabel?: string;
  description?: string;
  maxwidth?: string;
}

export interface GoabCheckboxListProps extends Margins {
  name: string;
  value?: string[];
  disabled?: boolean;
  error?: boolean;
  testId?: string;
  ariaLabel?: string;
  description?: string | React.ReactNode;
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
  ariaLabel,
  description,
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
        onChange?.(detail);
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
      arialabel={ariaLabel}
      description={typeof description === "string" ? description : undefined}
      maxwidth={maxWidth}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
      {typeof description !== "string" && description && (
        <div slot="description">{description}</div>
      )}
    </goa-checkbox-list>
  );
}

export default GoabCheckboxList;
