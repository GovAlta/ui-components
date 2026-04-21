import { ReactNode, useEffect, useRef, type JSX } from "react";

import type {
  GoabAccordionHeadingSize,
  GoabAccordionIconPosition,
  GoabAccordionType,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  open?: string;
  headingsize?: GoabAccordionHeadingSize;
  heading?: string;
  secondarytext?: string;
  headingContent?: ReactNode;
  maxwidth?: string;
  testid?: string;
  iconposition?: GoabAccordionIconPosition;
  type?: GoabAccordionType;
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
  /** Sets the heading text. */
  heading?: string;
  /** Sets the state of the accordion container open or closed. */
  open?: boolean;
  /** Sets the heading size of the accordion container heading. @default "small" */
  headingSize?: GoabAccordionHeadingSize;
  /** Sets secondary text displayed alongside the heading. */
  secondaryText?: string;
  /** Sets content rendered within the accordion heading, alongside the heading text. */
  headingContent?: ReactNode;
  /** Sets content rendered in the accordion heading, right-aligned before the expand/collapse icon. */
  actions?: ReactNode;
  /** Sets the maximum width of the accordion. @default "none" */
  maxWidth?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Sets the position of the expand/collapse icon. @default "left" */
  iconPosition?: GoabAccordionIconPosition;
  /** Sets the accordion style variant. @default "normal" */
  type?: GoabAccordionType;
  /** Callback fired when the accordion is opened or closed. Receives the new open state as a boolean. */
  onChange?: (open: boolean) => void;
  /** Content rendered inside the accordion body. */
  children?: ReactNode;
}

/** Let users show and hide sections of related content on a page. */
export function GoabAccordion({
  open,
  onChange,
  headingContent,
  actions,
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
    <goa-accordion ref={ref} open={open ? "true" : undefined} {..._props}>
      {headingContent && <div slot="headingcontent">{headingContent}</div>}
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-accordion>
  );
}

export default GoabAccordion;
