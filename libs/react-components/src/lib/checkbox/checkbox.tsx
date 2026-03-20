import {
  DataAttributes,
  GoabCheckboxOnChangeDetail,
  Margins,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  id?: string;
  name: string;
  checked?: string;
  indeterminate?: string;
  disabled?: string;
  error?: string;
  text?: string;
  value?: string | number;
  arialabel?: string;
  description?: string | React.ReactNode;
  reveal?: React.ReactNode;
  revealarialabel?: string;
  maxwidth?: string;
  testid?: string;
}

/* eslint-disable-next-line */
export interface GoabCheckboxProps extends Margins, DataAttributes {
  id?: string;
  name: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  text?: string;
  value?: string | number | boolean;
  children?: React.ReactNode;
  testId?: string;
  ariaLabel?: string;
  description?: string | React.ReactNode;
  reveal?: React.ReactNode;
  revealAriaLabel?: string;
  maxWidth?: string;
  onChange?: (detail: GoabCheckboxOnChangeDetail) => void;
}

// legacy
export type Props = GoabCheckboxProps;

export function GoabCheckbox({
  error,
  checked,
  indeterminate,
  disabled,
  value,
  description,
  reveal,
  onChange,
  name,
  children,
  ...rest
}: GoabCheckboxProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabCheckboxOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };

    current.addEventListener("_change", listener);

    return () => {
      current.removeEventListener("_change", listener);
    };
  }, [name, onChange]);

  return (
    <goa-checkbox
      ref={el}
      {..._props}
      name={name}
      error={error ? "true" : undefined}
      checked={checked ? "true" : undefined}
      indeterminate={indeterminate ? "true" : undefined}
      disabled={disabled ? "true" : undefined}
      value={typeof value === "boolean" ? (value ? "true" : undefined) : value}
      description={typeof description === "string" ? description : undefined}
    >
      {children}
      {typeof description !== "string" && description && (
        <div slot="description">{description}</div>
      )}
      {reveal && <div slot="reveal">{reveal}</div>}
    </goa-checkbox>
  );
}

export default GoabCheckbox;
