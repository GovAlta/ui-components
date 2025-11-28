import { ReactNode, useEffect, useRef, type JSX } from "react";
import {
  DataGridProps,
  GoabFieldsetOnContinueDetail,
  GoabFormDispatchOn,
} from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

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

interface GoabFieldsetProps extends DataGridProps {
  id?: string;
  sectionTitle?: string;
  dispatchOn?: GoabFormDispatchOn;
  onContinue?: (event: GoabFieldsetOnContinueDetail) => void;
  children: ReactNode;
}

export function GoabFieldset(props: GoabFieldsetProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["onContinue"],
    attributeMapping: "kebab",
  });

  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const continueListener = (e: Event) => {
      const event = (e as CustomEvent<GoabFieldsetOnContinueDetail>).detail;
      return props.onContinue?.(event);
    };

    if (props.onContinue) {
      current.addEventListener("_continue", continueListener);
    }

    return () => {
      if (props.onContinue) {
        current.removeEventListener("_continue", continueListener);
      }
    };
  }, [ref, props.onContinue]);

  return (
    <goa-fieldset ref={ref} {..._props}>
      {props.children}
    </goa-fieldset>
  );
}

export default GoabFieldset;
