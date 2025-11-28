import { ReactNode, useEffect, useRef, type JSX } from "react";

import type {
  GoabAccordionHeadingSize,
  GoabAccordionIconPosition,
  Margins, DataGridProps,
} from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps extends Margins {
  open?: string;
  headingsize?: GoabAccordionHeadingSize;
  heading: string;
  secondarytext?: string;
  headingContent?: ReactNode;
  maxwidth?: string;
  testid?: string;
  iconposition?: GoabAccordionIconPosition;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-accordion": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

export interface GoabAccordionProps extends Margins, DataGridProps {
  open?: boolean;
  headingSize?: GoabAccordionHeadingSize;
  secondaryText?: string;
  heading: string;
  headingContent?: ReactNode;
  maxWidth?: string;
  testId?: string;
  iconPosition?: GoabAccordionIconPosition;
  onChange?: (open: boolean) => void;
  children?: ReactNode;
}

export function GoabAccordion(props: GoabAccordionProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["open", "onChange", "headingContent"],
    attributeMapping: "lowercase"
  });

  useEffect(() => {
    const element = ref.current;
    if (element && props.onChange) {
      const handler = (event: Event) => {
        const customEvent = event as CustomEvent;
        props.onChange?.(customEvent.detail.open);
      };
      element.addEventListener("_change", handler);
      return () => {
        element.removeEventListener("_change", handler);
      };
    }
  }, [props.onChange]);

  return (
    <goa-accordion
      ref={ref}
      open={props.open ? "true" : undefined}
      {..._props}
    >
      {props.headingContent && <div slot="headingcontent">{props.headingContent}</div>}
      {props.children}
    </goa-accordion>
  );
}

export default GoabAccordion;
