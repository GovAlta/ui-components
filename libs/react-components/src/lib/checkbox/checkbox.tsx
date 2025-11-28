import { DataGridProps, GoabCheckboxOnChangeDetail, Margins } from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { extractProps } from "../common/extract-props";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-checkbox": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

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
  const el = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["error", "checked", "indeterminate", "disabled", "value", "description", "reveal", "onChange"],
    attributeMapping: "lowercase",
  });

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabCheckboxOnChangeDetail>).detail;
      props.onChange?.(detail);
    };

    current.addEventListener("_change", listener);

    return () => {
      current.removeEventListener("_change", listener);
    };
  }, [props.name, props.onChange]);

  return (
    <goa-checkbox
      ref={el}
      error={props.error ? "true" : undefined}
      checked={props.checked ? "true" : undefined}
      indeterminate={props.indeterminate ? "true" : undefined}
      disabled={props.disabled ? "true" : undefined}
      value={typeof props.value === "boolean" ? (props.value ? "true" : undefined) : props.value}
      description={typeof props.description === "string" ? props.description : undefined}
      {..._props}
    >
      {props.children}
      {typeof props.description !== "string" && props.description && (
        <div slot="description">{props.description}</div>
      )}
      {props.reveal && <div slot="reveal">{props.reveal}</div>}
    </goa-checkbox>
  );
}

export default GoabCheckbox;
