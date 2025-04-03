import { GoabCheckboxOnChangeDetail, Margins } from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { toOptionalBooleanAsString } from "../../utils";

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
  disabled?: string;
  error?: string;
  text?: string;
  value?: string | number;
  arialabel?: string;
  description?: string | React.ReactNode;
  maxwidth?: string;
  testid?: string;
}

/* eslint-disable-next-line */
export interface GoabCheckboxProps extends Margins {
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
  onChange?: (detail: GoabCheckboxOnChangeDetail) => void;
}

// legacy
export type Props = GoabCheckboxProps;

export function GoabCheckbox({
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
}: GoabCheckboxProps): JSX.Element {
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
      error={toOptionalBooleanAsString(error)}
      checked={toOptionalBooleanAsString(checked)}
      disabled={toOptionalBooleanAsString(disabled, { omitIfFalse: true })}
      text={text}
      value={typeof value === "boolean" ? toOptionalBooleanAsString(value) : value}
      arialabel={ariaLabel}
      description={typeof description === "string" ? description : undefined}
      maxwidth={maxWidth}
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

export default GoabCheckbox;
