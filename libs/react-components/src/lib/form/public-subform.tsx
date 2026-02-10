import { ReactNode } from "react";
import { DataAttributes } from "@abgov/ui-components-common";

interface WCProps {}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-pf-subform": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          children?: React.ReactNode;
        };
    }
  }
}

interface GoabPfSubformProps extends DataAttributes {
  formContent?: ReactNode;
  children?: ReactNode;
}

export function GoabPfSubform({
  formContent,
  children,
  ...rest
}: GoabPfSubformProps) {
  return (
    <goa-pf-subform {...rest}>
      {formContent && <div slot="form">{formContent}</div>}
      {children}
    </goa-pf-subform>
  );
}

export default GoabPfSubform;
