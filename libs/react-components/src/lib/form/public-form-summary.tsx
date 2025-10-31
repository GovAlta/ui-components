import { useRef } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

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

interface GoabPublicFormSummaryProps extends DataGridProps {
  heading?: string;
}

export function GoabPublicFormSummary(props: GoabPublicFormSummaryProps) {
  const [dataGridProps, {
    heading = ""
  }] = useDataGridProps(props);
  const ref = useRef<HTMLElement>(null);

  return (
    <goa-public-form-summary
      ref={ref}
      heading={heading}
      {...dataGridProps}
    >
    </goa-public-form-summary>
  );
}

export default GoabPublicFormSummary;
