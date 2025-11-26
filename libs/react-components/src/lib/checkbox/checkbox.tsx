import { GoabCheckboxOnChangeDetail, Margins } from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-checkbox": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
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
  version?: string;
}

/* eslint-disable-next-line */
export interface GoabCheckboxProps extends Margins, DataGridProps {
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

export function GoabCheckbox(props: GoabCheckboxProps): JSX.Element {
  const [dataGridProps, {
    id,
    name,
    testId,
    error,
    disabled,
    checked,
    indeterminate,
    value,
    text,
    description,
    reveal,
    revealAriaLabel,
    maxWidth,
    children,
    onChange,
    ariaLabel,
    mt,
    mr,
    mb,
    ml
  }] = useDataGridProps(props);
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabCheckboxOnChangeDetail>).detail;
      onChange?.(detail);
    };

    current.addEventListener("_change", listener);

    return () => {
      current.removeEventListener("_change", listener);
    };
  }, [name, onChange]);

  return (
    <goa-checkbox
      testid={testId}
      ref={el}
      id={id}
      name={name}
      error={error ? "true" : undefined}
      checked={checked ? "true" : undefined}
      indeterminate={indeterminate ? "true" : undefined}
      disabled={disabled ? "true" : undefined}
      text={text}
      value={typeof value === "boolean" ? (value ? "true" : undefined) : value}
      arialabel={ariaLabel}
      revealarialabel={revealAriaLabel}
      description={typeof description === "string" ? description : undefined}
      maxwidth={maxWidth}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      {...dataGridProps}
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
