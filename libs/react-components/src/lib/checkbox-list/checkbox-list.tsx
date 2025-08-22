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
  selectedvalues?: string[];
  disabled?: string;
  error?: string;
  testid?: string;
  arialabel?: string;
  description?: string;
  orientation?: "vertical" | "horizontal";
  maxwidth?: string;
  showselectall?: string;
  selectalltext?: string;
  // child margins (applied to child checkboxes if they don't already declare that side)
  mlchild?: Spacing | string | null;
  mrchild?: Spacing | string | null;
  mtchild?: Spacing | string | null;
  mbchild?: Spacing | string | null;
}

export interface GoabCheckboxListProps extends Margins {
  name: string;
  value?: string[];
  disabled?: boolean;
  error?: boolean;
  testId?: string;
  ariaLabel?: string;
  description?: string | React.ReactNode;
  orientation?: "vertical" | "horizontal";
  maxWidth?: string;
  showSelectAll?: boolean;
  selectAllText?: string;
  children?: React.ReactNode;
  onChange?: (detail: GoabCheckboxListOnChangeDetail) => void;
  // child margins
  mlChild?: Spacing | null;
  mrChild?: Spacing | null;
  mtChild?: Spacing | null;
  mbChild?: Spacing | null;
}

export function GoabCheckboxList({
  name,
  value = [],
  disabled,
  error,
  testId,
  ariaLabel,
  description,
  orientation = "vertical",
  maxWidth,
  showSelectAll,
  selectAllText = "Select All",
  children,
  onChange,
  mt,
  mr,
  mb,
  ml,
  // child margins
  mlChild,
  mrChild,
  mtChild,
  mbChild,
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
      selectedvalues={value}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      testid={testId}
      arialabel={ariaLabel}
      description={typeof description === "string" ? description : undefined}
      orientation={orientation}
      maxwidth={maxWidth}
      showselectall={showSelectAll ? "true" : undefined}
      selectalltext={selectAllText}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      mlchild={mlChild as string | undefined}
      mrchild={mrChild as string | undefined}
      mtchild={mtChild as string | undefined}
      mbchild={mbChild as string | undefined}
    >
      {children}
      {typeof description !== "string" && description && (
        <div slot="description">{description}</div>
      )}
    </goa-checkbox-list>
  );
}

export default GoabCheckboxList;
