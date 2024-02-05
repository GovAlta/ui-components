import { ReactNode } from "react";
import { Margins } from "../../common/styling";

export type GoAHeadingSize = "small" | "medium";

interface WCProps extends Margins {
  open?: boolean;
  headingSize?: GoAHeadingSize;
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

export interface GoAAccordionProps extends Margins {
  open?: boolean;
  headingSize?: GoAHeadingSize;
  secondaryText?: string;
  heading: string;
  headingContent?: ReactNode;
  testid?: string;
  children: ReactNode;
}

export function GoAAccordion({
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
}: GoAAccordionProps): JSX.Element {
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

export default GoAAccordion;
