import { GoabCheckboxListOnChangeDetail, Margins } from "@abgov/ui-components-common";
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
  value?: string;
  disabled?: string;
  error?: string;
  testid?: string;
  arialabel?: string;
  description?: string;
  orientation?: "vertical" | "horizontal";
  maxwidth?: string;
  showselectall?: string;
  selectalltext?: string;
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
}

function getValueAsString(value?: string[]): string {
  return value?.join(",") || "";
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
}: GoabCheckboxListProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabCheckboxListOnChangeDetail>).detail;
      onChange?.(detail);
    };

    current.addEventListener("_change", listener);

    return () => {
      current.removeEventListener("_change", listener);
    };
  }, [name, onChange]);

  return (
    <goa-checkbox-list
      ref={el}
      name={name}
      value={getValueAsString(value)}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      testid={testId}
      arialabel={ariaLabel}
      description={typeof description === "string" ? description : undefined}
      orientation={orientation}
      maxwidth={maxWidth}
      showselectall={showSelectAll ? "true" : "false"}
      selectalltext={selectAllText}
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
