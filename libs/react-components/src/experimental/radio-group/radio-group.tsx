import { useEffect, useRef, type JSX } from "react";
import {
  GoabRadioGroupOnChangeDetail,
  GoabRadioGroupOrientation,
  GoabRadioGroupSize,
  Margins, DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../../lib/common/extract-props";

export * from "./radio";

interface WCProps extends Margins {
  name: string;
  value?: string;
  id?: string;
  orientation?: GoabRadioGroupOrientation;
  disabled?: string;
  error?: string;
  arialabel?: string;
  testid?: string;
  size?: GoabRadioGroupSize;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-radio-group": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

export interface GoabxRadioGroupProps extends Margins, DataAttributes {
  /** The name for the radio group. Used for accessibility and change events. */
  name: string;
  /** The currently selected value in the radio group. */
  value?: string;
  id?: string;
  /**
   * Disables all radio items in the group.
   * @default false
   */
  disabled?: boolean;
  /**
   * Sets the layout direction. 'vertical' stacks items, 'horizontal' places them in a row.
   * @default "vertical"
   */
  orientation?: GoabRadioGroupOrientation;
  /**
   * Sets the size of all radio items. 'compact' reduces spacing for dense layouts (V2 only).
   * @default "default"
   */
  size?: GoabRadioGroupSize;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /**
   * Shows an error state on all radio items in the group.
   * @default false
   */
  error?: boolean;
  /**
   * Defines how the radio group will be announced by screen readers.
   * @default ""
   */
  ariaLabel?: string;
  children?: React.ReactNode;
  version?: string;
  onChange?: (detail: GoabRadioGroupOnChangeDetail) => void;
}

export function GoabxRadioGroup({
  disabled,
  error,
  onChange,
  name,
  children,
  size = "default",
  version = "2",
  ...rest
}: GoabxRadioGroupProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>({ size, ...rest }, lowercase);

  useEffect(() => {
    if (!el.current) return;

    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };

    const currentEl = el.current;
    if (onChange) {
      currentEl.addEventListener("_change", listener);
    }

    return () => {
      if (onChange) {
        currentEl.removeEventListener("_change", listener);
      }
    };
  }, [name, onChange]);

  return (
    <goa-radio-group
      ref={el}
      {..._props}
      name={name}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      version={version}
    >
      {children}
    </goa-radio-group>
  );
}

export default GoabxRadioGroup;
