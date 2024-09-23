import { ReactNode, useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

// TODO: move these types into the common lib for the upcoming major release

interface WCProps extends Margins {
  ref?: React.MutableRefObject<HTMLElement | null>;
  id: string;
  heading?: string;
  buttontext?: string;
  last?: boolean | null;
  first?: boolean | null;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-fieldset": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoAFieldsetProps extends Margins {
  id: string;
  first?: boolean;
  last?: boolean;
  heading?: string;
  buttonText?: string;
  errors?: Record<string, string>;
  onContinue?: (el: HTMLElement, state: Record<string, string>) => boolean | void | undefined;
  children: ReactNode;
}

export function GoAFieldset({
  heading,
  buttonText,
  id,
  onContinue,
  children,
  mt,
  mr,
  mb,
  ml,
  first,
  last,
}: GoAFieldsetProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const _continue = (e: Event) => {
      const { el, state } = (e as CustomEvent).detail;
      return onContinue?.(el, state);
    }

    if (onContinue) {
      ref.current?.addEventListener("_continue", _continue)
    }
    return () => {
      if (onContinue) {
        ref.current?.removeEventListener("_continue", _continue)
      }
    }
  }, [ref.current, onContinue])

  return (
    <goa-fieldset
      ref={ref}
      id={id}
      first={first}
      last={last}
      heading={heading}
      buttontext={buttonText}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-fieldset>
  );
}

export default GoAFieldset;
