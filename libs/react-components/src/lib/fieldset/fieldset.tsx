import { ReactNode, useEffect, useRef } from "react";
import { Margins, GoabFielsetOnContinueDetail } from "@abgov/ui-components-common";
import { toOptionalBooleanAsString } from "../../utils";

interface WCProps extends Margins {
  ref?: React.RefObject<HTMLElement | null>;
  id: string;
  heading?: string;
  buttontext?: string;
  last?: string;
  first?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form-page": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoabFieldsetProps extends Margins {
  id: string;
  first?: boolean;
  last?: boolean;
  heading?: string;
  buttonText?: string;
  errors?: Record<string, string>;
  onContinue?: (event: GoabFielsetOnContinueDetail) => boolean | void | undefined;
  children: ReactNode;
}

export function GoabFieldset({
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
}: GoabFieldsetProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const _continue = (e: Event) => {
      const event = (e as CustomEvent).detail;
      return onContinue?.(event);
    }

    if (onContinue) {
      current.addEventListener("_continue", _continue);
    }
    return () => {
      if (onContinue) {
        current.removeEventListener("_continue", _continue);
      }
    };
  }, [ref, onContinue]);

  return (
    <goa-public-form-page
      ref={ref}
      id={id}
      first={toOptionalBooleanAsString(first)}
      last={toOptionalBooleanAsString(last)}
      heading={heading}
      buttontext={buttonText}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-public-form-page>
  );
}

export default GoabFieldset;
