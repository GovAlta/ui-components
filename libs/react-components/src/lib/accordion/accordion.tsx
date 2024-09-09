import { ReactNode , useEffect, useRef} from "react";

import type { GoabAccordionHeadingSize, Margins } from "@abgov/ui-components-common";
// TODO: move to ts
export type GoAIconPosition = "left" | "right";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  open?: boolean;
  headingSize?: GoabAccordionHeadingSize;
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

export interface GoabAccordionProps extends Margins {
  open?: boolean;
  headingSize?: GoabAccordionHeadingSize;
  secondaryText?: string;
  heading: string;
  headingContent?: ReactNode;
  maxWidth?: string;
  testid?: string;
  iconPosition?: GoAIconPosition;
  onChange?: (open: boolean) => void;
  children: ReactNode;
}

export function GoabAccordion({
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
}: GoabAccordionProps): JSX.Element {
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

export default GoabAccordion;
