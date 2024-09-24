import { ReactNode, useEffect, useRef } from "react";
import { Margins } from "../../common/styling";
import { relay } from "../validators";

// TODO: move these types into the common lib for the upcoming major release

export type FormState = {
  form: Record<string, Record<string, { label: string; value: string }>>;
  history: string[];
  editting: string;
  lastModified?: Date;
};

interface WCProps extends Margins {
  ref?: React.MutableRefObject<HTMLElement | undefined>;
  name: string;
  storage: "none" | "local" | "session";
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

interface GoAFormProps extends Margins {
  children: ReactNode;
  name: string;
  storage: "none" | "local" | "session";
  onMount: (fn: (next: string) => void) => void;
  onStateChange?: (
    id: string,
    state: Record<string, Record<string, { label: string; value: string }>>,
  ) => void;
}

export function GoASimpleForm({
  name,
  storage,
  onMount,
  onStateChange,
  mt,
  mr,
  mb,
  ml,
  children,
}: GoAFormProps) {
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
      onMount(onContinue);
    }
  }, [el.current]);

  useEffect(() => {
    const _stateChange = (e: Event) => {
      const { id, state } = (e as CustomEvent).detail;
      return onStateChange?.(id, state);
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
