import { useRef } from "react";

interface WCProps {
  ref?: React.RefObject<HTMLElement | null>;
  heading?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form-summary": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoabPublicFormSummaryProps {
  heading?: string;
}

export function GoabPublicFormSummary({
  heading = "",
}: GoabPublicFormSummaryProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <goa-public-form-summary
      ref={ref}
      heading={heading}
    >
    </goa-public-form-summary>
  );
}

export default GoabPublicFormSummary;
