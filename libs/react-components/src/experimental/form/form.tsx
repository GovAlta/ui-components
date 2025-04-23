import { ReactNode, useEffect, useRef } from "react";
import {
  GoabFormStorageType,
  GoabFormOnMountDetail,
  GoabFormOnStateChange,
  Margins
} from "../../common/types";
import { relay } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  ref?: React.MutableRefObject<HTMLElement | undefined>;
  name: string;
  storage: GoabFormStorageType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-simple-form": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoabFormProps extends Margins {
  children: ReactNode;
  name: string;
  storage: GoabFormStorageType;
  onMount: (e: GoabFormOnMountDetail) => void;
  onStateChange?: (e: GoabFormOnStateChange) => void;
}

export function GoabSimpleForm({
  name,
  storage,
  onMount,
  onStateChange,
  mt,
  mr,
  mb,
  ml,
  children,
}: GoabFormProps) {
  const el = useRef<HTMLElement>();

  useEffect(() => {
    const _continueTo = (el: HTMLElement | undefined, next: string) => {
      if (!el) {
        console.error("external::continue el is undefined");
        return;
      }
      relay<{ next: string }>(el, "external::continue", {
        next,
      });
    };

    if (el.current) {
      const form = el.current.shadowRoot?.querySelector("form");
      if (!form) return;

      const onContinue = (next: string) => {
        _continueTo(form, next);
      };

      onMount({ fn: onContinue });
    }
  }, [el.current]);

  useEffect(() => {
    const _stateChange = (e: Event) => {
      const { id, state } = (e as CustomEvent).detail;
      return onStateChange?.({ id, state });
    };

    if (onStateChange) {
      el.current?.addEventListener("_stateChange", _stateChange);
    }
    return () => {
      if (onStateChange) {
        el.current?.removeEventListener("_stateChange", _stateChange);
      }
    };
  }, [el.current, onStateChange]);

  return (
    <goa-simple-form
      ref={el}
      name={name}
      storage={storage}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-simple-form>
  );
}

export default GoabSimpleForm;
