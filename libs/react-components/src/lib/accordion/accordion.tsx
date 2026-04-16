import { ReactNode, useEffect, useRef, type JSX } from "react";

import type {
  GoabAccordionHeadingSize,
  GoabAccordionIconPosition,
  Margins, DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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

export interface GoabAccordionProps extends Margins, DataAttributes {
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

export function GoabAccordion({
  open,
  onChange,
  headingContent,
  children,
  ...rest
}: GoabAccordionProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    const element = ref.current;
    if (element && onChange) {
      const handler = (event: Event) => {
        const customEvent = event as CustomEvent;
        onChange?.(customEvent.detail.open);
      };
      element.addEventListener("_change", handler);
      return () => {
        element.removeEventListener("_change", handler);
      };
    }
  }, [onChange]);

  return (
    <goa-accordion
      ref={ref}
      open={open ? "true" : undefined}
      {..._props}
    >
      {headingContent && <div slot="headingcontent">{headingContent}</div>}
      {children}
    </goa-accordion>
  );
}

export default GoabAccordion;
