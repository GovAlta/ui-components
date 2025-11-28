import { DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps {
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

export function GoabPublicFormSummary({
  heading = "",
  ...props
}: GoabPublicFormSummaryProps) {
  const _props = extractProps<WCProps>(
    { heading, ...props },
    {
      attributeMapping: "lowercase",
    }
  );

  return (
    <goa-public-form-summary {..._props} />
  );
}

export default GoabPublicFormSummary;
