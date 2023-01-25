import React, { FC, ReactNode } from "react";
import { Margins } from "../../common/styling";

type HeadingSize = "small" | "medium";

interface WCProps extends Margins {
  open?: boolean;
  headingSize?: HeadingSize;
  heading: string;
  secondaryText?: string
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

interface Props extends Margins {
  open?: boolean;
  headingSize?: HeadingSize;
  secondaryText?: string;
  heading: string;
  headingContent?: ReactNode;
  testid?: string;
}

export const GoAAccordion: FC<Props> = ({
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
}) => {
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
      {children}
      {headingContent && <div slot="headingcontent">{headingContent}</div>}
    </goa-accordion>
  );
};

export default GoAAccordion;
