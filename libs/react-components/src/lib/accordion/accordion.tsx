import React, { ReactNode, useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

export type GoAHeadingSize = "small" | "medium";
export type GoAIconPosition = "left" | "right";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  open?: boolean;
  headingSize?: GoAHeadingSize;
  heading: string;
  secondaryText?: string;
  headingContent?: ReactNode;
  maxwidth?: string;
  testid?: string;
  iconposition?: GoAIconPosition;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-accordion": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoAAccordionProps extends Margins {
  open?: boolean;
  headingSize?: GoAHeadingSize;
  secondaryText?: string;
  heading: string;
  headingContent?: ReactNode;
  maxWidth?: string;
  testid?: string;
  iconPosition?: GoAIconPosition;
  onChange?: (open: boolean) => void;
  children: ReactNode;
}

export function GoAAccordion({
  open,
  heading,
  headingSize,
  secondaryText,
  headingContent,
  iconPosition,
  maxWidth,
  testid,
  onChange,
  children,
  mt,
  mr,
  mb,
  ml,
}: GoAAccordionProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);

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
      open={open}
      headingSize={headingSize}
      heading={heading}
      secondaryText={secondaryText}
      iconposition={iconPosition}
      maxwidth={maxWidth}
      testid={testid}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {headingContent && <div slot="headingcontent">{headingContent}</div>}
      {children}
    </goa-accordion>
  );
}

export default GoAAccordion;
