import {
  GoabTextAreaCountBy,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
  GoabTextAreaOnBlurDetail,
  GoabTextAreaSize,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  name: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  error?: string;
  readOnly?: string;
  disabled?: string;
  width?: string;
  maxwidth?: string;
  arialabel?: string;
  countby?: GoabTextAreaCountBy;
  maxcount?: number;
  autocomplete?: string;
  testid?: string;
  size?: GoabTextAreaSize;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-textarea": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.Ref<HTMLTextAreaElement>;
        };
    }
  }
}

export interface GoabTextAreaProps extends Margins, DataAttributes {
  /** @required Name of the input value that is received in the change event. */
  name: string;
  /** Bound to the current value of the textarea. */
  value?: string;
  /** Sets the id attribute on the textarea element. */
  id?: string;
  /** Text displayed within the textarea when no value is set. */
  placeholder?: string;
  /** Sets the number of visible text rows. @default 3 */
  rows?: number;
  /** Sets the input to an error state. */
  error?: boolean;
  /** Sets the input to a read only state. */
  readOnly?: boolean;
  /** Sets the input to a disabled state. */
  disabled?: boolean;
  /** Sets the width of the text area. @default "100%" */
  width?: string;
  /** Sets the maximum width of the text area. @default "60ch" */
  maxWidth?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Defines how the text will be translated for the screen reader. If not specified it will fall back to the name. */
  ariaLabel?: string;
  /** Counting interval for characters or words, specifying whether to count every character or word. */
  countBy?: GoabTextAreaCountBy;
  /** Maximum number of characters or words allowed. */
  maxCount?: number;
  /** Specifies the autocomplete attribute for the textarea input. */
  autoComplete?: string;
  /** Sets the visual size variant of the text area. */
  size?: GoabTextAreaSize;
  /** Callback fired when the value of the textarea changes. */
  onChange?: (event: GoabTextAreaOnChangeDetail) => void;
  /** Callback fired when a key is pressed within the textarea. */
  onKeyPress?: (event: GoabTextAreaOnKeyPressDetail) => void;
  /** Callback fired when the textarea loses focus. */
  onBlur?: (event: GoabTextAreaOnBlurDetail) => void;
}

export function GoabTextArea({
  readOnly,
  disabled,
  error,
  onChange,
  onKeyPress,
  onBlur,
  ...rest
}: GoabTextAreaProps): JSX.Element {
  const el = useRef<HTMLTextAreaElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;

    const changeListener: EventListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabTextAreaOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };

    const keypressListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabTextAreaOnKeyPressDetail>).detail;
      onKeyPress?.({ ...detail, event: e as Event });
    };

    const blurListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabTextAreaOnBlurDetail>).detail;
      onBlur?.({ ...detail, event: e as Event });
    };

    current.addEventListener("_change", changeListener);
    current.addEventListener("_keyPress", keypressListener);
    current.addEventListener("_blur", blurListener);

    return () => {
      current.removeEventListener("_change", changeListener);
      current.removeEventListener("_keyPress", keypressListener);
      current.removeEventListener("_blur", blurListener);
    };
  }, [el, onChange, onKeyPress, onBlur]);

  return (
    <goa-textarea
      ref={el}
      readOnly={readOnly ? "true" : undefined}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      version="2"
      {..._props}
    ></goa-textarea>
  );
}

export default GoabTextArea;
