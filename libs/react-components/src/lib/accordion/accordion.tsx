import { ReactNode } from "react";

import type { ABGovAccordionHeadingSize, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  open?: boolean;
  headingSize?: ABGovAccordionHeadingSize;
  heading: string;
  secondaryText?: string;
  headingContent?: ReactNode;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-accordion": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface ABGovAccordionProps extends Margins {
  open?: boolean;
  headingSize?: ABGovAccordionHeadingSize;
  secondaryText?: string;
  heading: string;
  headingContent?: ReactNode;
  testid?: string;
  children: ReactNode;
}

export function ABGovAccordion({
  open,
  heading,
  headingSize,
  secondaryText,
  headingContent,
  testid,
  children,
  mt,
  mr,
  mb,
  ml,
}: ABGovAccordionProps): JSX.Element {
  return (
    <goa-accordion
      open={open}
      headingSize={headingSize}
      heading={heading}
      secondaryText={secondaryText}
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

export default ABGovAccordion;
