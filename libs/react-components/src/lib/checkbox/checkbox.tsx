import { GoABCheckboxOnChangeDetail, Margins } from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-checkbox": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  id?: string;
  name: string;
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  text?: string;
  value?: string | number | boolean;
  arialabel?: string;
  description?: string | React.ReactNode;
}

/* eslint-disable-next-line */
export interface GoABCheckboxProps extends Margins {
  id?: string;
  name: string;
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  text?: string;
  value?: string | number | boolean;
  children?: React.ReactNode;
  testId?: string;
  ariaLabel?: string;
  description?: string | React.ReactNode;
  onChange?: (detail: GoABCheckboxOnChangeDetail) => void;
}

// legacy
export type Props = GoABCheckboxProps;

export function GoABCheckbox({
  id,
  name,
  testId,
  error,
  disabled,
  checked,
  value,
  text,
  description,
  children,
  onChange,
  ariaLabel,
  mt,
  mr,
  mb,
  ml,
}: GoABCheckboxProps): JSX.Element {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoABCheckboxOnChangeDetail>).detail;
      onChange?.(detail);
    };

    current.addEventListener("_change", listener);

    return () => {
      current.removeEventListener("_change", listener);
    };
  }, [name, onChange]);

  return (
    <goa-checkbox
      data-testid={testId}
      ref={el}
      id={id}
      name={name}
      error={error}
      checked={checked}
      disabled={disabled}
      text={text}
      value={value}
      arialabel={ariaLabel}
      description={typeof description === "string" ? description : undefined}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {description && typeof description !== "string" && (
        <div slot="description">{description}</div>
      )}
      {children}
    </goa-checkbox>
  );
}

export default GoABCheckbox;
