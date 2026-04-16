import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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

interface GoabPublicFormSummaryProps extends DataAttributes {
  heading?: string;
}

export function GoabPublicFormSummary({
  heading = "",
  ...rest
}: GoabPublicFormSummaryProps) {
  const _props = transformProps<WCProps>(
    { heading, ...rest },
    lowercase
  );

  return (
    <goa-public-form-summary {..._props} />
  );
}

export default GoabPublicFormSummary;
