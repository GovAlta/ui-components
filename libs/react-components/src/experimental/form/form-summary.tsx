import * as React from "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-simple-form-summary": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export function GoabSimpleFormSummary() {
  return <goa-simple-form-summary />;
}

export default GoabSimpleFormSummary;
