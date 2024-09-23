import { useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

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
  maxwidth?: string;
}

/* eslint-disable-next-line */
export interface GoACheckboxProps extends Margins {
  id?: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  text?: string;
  value?: string | number | boolean;
  children?: React.ReactNode;
  testId?: string;
  ariaLabel?: string;
  description?: string | React.ReactNode;
  maxWidth?: string;
  onChange?: (name: string, checked: boolean, value: string) => void;
}

// legacy
export type Props = GoACheckboxProps;

export function GoACheckbox({
  id,
  name,
  testId,
  error,
  disabled,
  checked,
  value,
  text,
  description,
  maxWidth,
  children,
  onChange,
  ariaLabel,
  mt,
  mr,
  mb,
  ml,
}: GoACheckboxProps): JSX.Element {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = (e: unknown) => {
      const ce = e as CustomEvent;
      onChange?.(name, ce.detail.checked, ce.detail.value);
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
      checked={checked || false}
      disabled={disabled}
      text={text}
      value={value}
      arialabel={ariaLabel}
      description={typeof description === "string" ? description : undefined}
      maxwidth={maxWidth}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {description && typeof description !== "string" && <div slot="description">{description}</div>}
      {children}
    </goa-checkbox>
  );
}

export default GoACheckbox;
