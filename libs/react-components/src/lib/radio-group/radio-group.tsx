import { useEffect, useRef, type JSX } from "react";
import {
  GoabRadioGroupOnBlurDetail,
  GoabRadioGroupOnChangeDetail,
  GoabRadioGroupOnFocusDetail,
  GoabRadioGroupOrientation,
  GoabRadioGroupSize,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-radio-group": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

export interface GoabRadioGroupProps extends Margins, DataAttributes {
  /** @required The name for the radio group. Used for accessibility and change events. */
  name: string;
  /** The currently selected value in the radio group. */
  value?: string;
  /** The identifier for the radio group element. */
  id?: string;
  /** Disables all radio items in the group. */
  disabled?: boolean;
  /** Sets the layout direction. 'vertical' stacks items, 'horizontal' places them in a row. @default "vertical" */
  orientation?: GoabRadioGroupOrientation;
  /** Sets the size of all radio items. 'compact' reduces spacing for dense layouts. @default "default" */
  size?: GoabRadioGroupSize;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Shows an error state on all radio items in the group. */
  error?: boolean;
  /** Defines how the radio group will be announced by screen readers. */
  ariaLabel?: string;
  /** Radio items to render inside the group. */
  children?: React.ReactNode;
  /** Callback fired when the selected radio item changes. */
  onChange?: (detail: GoabRadioGroupOnChangeDetail) => void;
  /** Callback fired when focus enters any radio item in the group. */
  onFocus?: (detail: GoabRadioGroupOnFocusDetail) => void;
  /** Callback fired when focus leaves all radio items in the group. */
  onBlur?: (detail: GoabRadioGroupOnBlurDetail) => void;
}

/** Allow users to select one option from a set. */
export function GoabRadioGroup({
  disabled,
  error,
  onChange,
  onFocus,
  onBlur,
  name,
  children,
  size = "default",
  ...rest
}: GoabRadioGroupProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>({ size, ...rest }, lowercase);

  useEffect(() => {
    if (!el.current) return;

    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };
    const focusListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabRadioGroupOnFocusDetail>).detail;
      onFocus?.({ ...detail, event: e });
    };
    const blurListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabRadioGroupOnBlurDetail>).detail;
      onBlur?.({ ...detail, event: e });
    };

    const currentEl = el.current;
    if (onChange) {
      currentEl.addEventListener("_change", listener);
    }
    currentEl.addEventListener("_focus", focusListener);
    currentEl.addEventListener("_blur", blurListener);

    return () => {
      if (onChange) {
        currentEl.removeEventListener("_change", listener);
      }
      currentEl.removeEventListener("_focus", focusListener);
      currentEl.removeEventListener("_blur", blurListener);
    };
  }, [name, onChange, onFocus, onBlur]);

  return (
    <goa-radio-group
      ref={el}
      {..._props}
      name={name}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
    >
      {children}
    </goa-radio-group>
  );
}

export default GoabRadioGroup;
