import {
  DataAttributes,
  GoabCheckboxOnChangeDetail,
  GoabCheckboxSize,
  Margins,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-checkbox": WCProps &
        React.HTMLAttributes<HTMLElement> & {
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
  size?: GoabCheckboxSize;
  version?: string;
}

/* eslint-disable-next-line */
export interface GoabCheckboxProps extends Margins, DataAttributes {
  /** @required Unique name to identify the checkbox. */
  name: string;
  /** Sets a unique id for the checkbox element. */
  id?: string;
  /** Marks the checkbox item as selected. */
  checked?: boolean;
  /** Shows a mixed/partial selection state. Used for 'Select All' checkboxes when some items are selected. */
  indeterminate?: boolean;
  /** Disable this control. It will not receive focus or events. */
  disabled?: boolean;
  /** Shows an error on the checkbox item. */
  error?: boolean;
  /** Label shown beside the checkbox. */
  text?: string;
  /** The value binding. */
  value?: string | number | boolean;
  /** Content rendered inside the checkbox label slot. */
  children?: React.ReactNode;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Defines how the text will be translated for the screen reader. If not specified it will fall back to the name. */
  ariaLabel?: string;
  /** Additional description text displayed below the checkbox label. */
  description?: string | React.ReactNode;
  /** Content revealed when the checkbox is checked. */
  reveal?: React.ReactNode;
  /** Text announced by screen readers when the reveal slot content is displayed. */
  revealAriaLabel?: string;
  /** Sets the maximum width of the checkbox. */
  maxWidth?: string;
  /** Sets the size of the checkbox. 'compact' reduces spacing for dense layouts. @default "default" */
  size?: GoabCheckboxSize;
  /** Callback fired when the checkbox selection changes. */
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
  size = "default",
  ...rest
}: GoabCheckboxProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>({ size, ...rest }, lowercase);

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
      version="2"
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
