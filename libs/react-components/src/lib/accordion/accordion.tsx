import { ReactNode, useEffect, useRef, type JSX } from "react";

import type {
  GoabAccordionHeadingSize,
  GoabAccordionIconPosition,
  Margins,
} from "@abgov/ui-components-common";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
  open?: string;
  headingsize?: GoabAccordionHeadingSize;
  heading: string;
  secondarytext?: string;
  headingContent?: ReactNode;
  maxwidth?: string;
  testid?: string;
  iconposition?: GoabAccordionIconPosition;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-accordion": WCProps & React.HTMLAttributes<HTMLElement>;
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
  const [dataGridProps, {
    open,
    heading,
    headingSize,
    secondaryText,
    headingContent,
    iconPosition,
    maxWidth,
    testId,
    onChange,
    children,
    mt,
    mr,
    mb,
    ml}] = useDataGridProps(props);

  useEffect(() => {
    const element = ref.current;
    if (element && onChange) {
      const handler = (event: Event) => {
        const customEvent = event as CustomEvent;
        onChange(customEvent.detail.open);
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
      headingsize={headingSize}
      heading={heading}
      secondarytext={secondaryText}
      iconposition={iconPosition}
      maxwidth={maxWidth}
      testid={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      {...dataGridProps}
    >
      {headingContent && <div slot="headingcontent">{headingContent}</div>}
      {children}
    </goa-accordion>
  );
}

export default GoabAccordion;
