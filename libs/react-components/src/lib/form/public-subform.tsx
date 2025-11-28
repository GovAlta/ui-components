import { ReactNode, useEffect, useRef } from "react";
import { Margins, DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps extends Margins {
  id?: string;
  name?: string;
  "continue-msg"?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-subform": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

interface GoabPublicSubformProps extends Margins, DataGridProps {
  id?: string;
  name?: string;
  continueMsg?: string;
  onInit?: (event: Event) => void;
  onStateChange?: (event: Event) => void;
  children: ReactNode;
}

export function GoabPublicSubform({
  id = "",
  name = "",
  continueMsg = "",
  ...props
}: GoabPublicSubformProps) {
  const ref = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(
    { id, name, continueMsg, ...props },
    {
      exclude: ["onInit", "onStateChange"],
      attributeMapping: "kebab",
    }
  );

  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const initListener = (e: Event) => {
      props.onInit?.(e);
    };

    const stateChangeListener = (e: Event) => {
      props.onStateChange?.(e);
    };

    if (props.onInit) {
      current.addEventListener("_init", initListener);
    }
    if (props.onStateChange) {
      current.addEventListener("_stateChange", stateChangeListener);
    }

    return () => {
      if (props.onInit) {
        current.removeEventListener("_init", initListener);
      }
      if (props.onStateChange) {
        current.removeEventListener("_stateChange", stateChangeListener);
      }
    };
  }, [ref, props.onInit, props.onStateChange]);

  return (
    <goa-public-subform ref={ref} {..._props}>
      {props.children}
    </goa-public-subform>
  );
}

export default GoabPublicSubform;
