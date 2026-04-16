import { ReactNode, useEffect, useRef, type JSX } from "react";
import {
  DataAttributes,
  GoabFieldsetOnContinueDetail,
  GoabFormDispatchOn,
} from "@abgov/ui-components-common";
import { transformProps, kebab } from "../common/extract-props";

interface WCProps {
  id?: string;
  "section-title"?: string;
  "dispatch-on"?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-fieldset": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

interface GoabFieldsetProps extends DataAttributes {
  id?: string;
  sectionTitle?: string;
  dispatchOn?: GoabFormDispatchOn;
  onContinue?: (event: GoabFieldsetOnContinueDetail) => void;
  children: ReactNode;
}

export function GoabFieldset({
  onContinue,
  children,
  ...rest
}: GoabFieldsetProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(rest, kebab);

  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const continueListener = (e: Event) => {
      const event = (e as CustomEvent<GoabFieldsetOnContinueDetail>).detail;
      return onContinue?.(event);
    };

    if (onContinue) {
      current.addEventListener("_continue", continueListener);
    }

    return () => {
      if (onContinue) {
        current.removeEventListener("_continue", continueListener);
      }
    };
  }, [ref, onContinue]);

  return (
    <goa-fieldset ref={ref} {..._props}>
      {children}
    </goa-fieldset>
  );
}

export default GoabFieldset;
