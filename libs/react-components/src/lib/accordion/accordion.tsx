import { ReactNode } from "react";

import type { GoabAccordionHeadingSize, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  open?: boolean;
  headingSize?: GoabAccordionHeadingSize;
  heading: string;
  secondaryText?: string;
  headingContent?: ReactNode;
  maxwidth?: string;
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
  children: ReactNode;
}

export function GoabAccordion({
  open,
  heading,
  headingSize,
  secondaryText,
  headingContent,
  maxWidth,
  testid,
  children,
  mt,
  mr,
  mb,
  ml,
}: GoabAccordionProps): JSX.Element {
  return (
    <goa-accordion
      open={open}
      headingSize={headingSize}
      heading={heading}
      secondaryText={secondaryText}
      maxwidth={maxWidth}
      data-testid={testid}
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
