import {
  GoabTextAreaCountBy,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
  GoabTextAreaOnBlurDetail,
  Margins, DataGridProps,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { extractProps } from "../common/extract-props";

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
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-textarea": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.Ref<HTMLTextAreaElement>;
      };
    }
  }
}

export interface GoabTextAreaProps extends Margins, DataGridProps {
  name: string;
  value?: string;
  id?: string;
  placeholder?: string;
  rows?: number;
  error?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  width?: string;
  maxWidth?: string;
  testId?: string;
  ariaLabel?: string;
  countBy?: GoabTextAreaCountBy;
  maxCount?: number;
  autoComplete?: string;

  onChange?: (event: GoabTextAreaOnChangeDetail) => void;
  onKeyPress?: (event: GoabTextAreaOnKeyPressDetail) => void;
  onBlur?: (event: GoabTextAreaOnBlurDetail) => void;
}

export function GoabTextArea(props: GoabTextAreaProps): JSX.Element {
  const el = useRef<HTMLTextAreaElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["readOnly", "disabled", "error", "onChange", "onKeyPress", "onBlur"],
    attributeMapping: "lowercase",
  });

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;

    const changeListener: EventListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabTextAreaOnChangeDetail>).detail;
      props.onChange?.(detail);
    };

    const keypressListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabTextAreaOnKeyPressDetail>).detail;
      props.onKeyPress?.(detail);
    };

    const blurListener = (e: unknown) => {
      const detail = (e as CustomEvent<GoabTextAreaOnBlurDetail>).detail;
      props.onBlur?.(detail);
    };

    current.addEventListener("_change", changeListener);
    current.addEventListener("_keyPress", keypressListener);
    current.addEventListener("_blur", blurListener);

    return () => {
      current.removeEventListener("_change", changeListener);
      current.removeEventListener("_keyPress", keypressListener);
      current.removeEventListener("_blur", blurListener);
    };
  }, [el, props.onChange, props.onKeyPress, props.onBlur]);

  return (
    <goa-textarea
      ref={el}
      readOnly={props.readOnly ? "true" : undefined}
      disabled={props.disabled ? "true" : undefined}
      error={props.error ? "true" : undefined}
      {..._props}
    ></goa-textarea>
  );
}

export default GoabTextArea;
