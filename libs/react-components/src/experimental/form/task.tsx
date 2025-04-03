import { ReactNode } from "react";
import { Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  status: "completed" | "not-started" | "cannot-start";
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form-task": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

type GoabPublicFormTaskProps = {
  status: "completed" | "not-started" | "cannot-start";
  children: ReactNode;
}

export function GoabPublicFormTask({status, children}: GoabPublicFormTaskProps) {
  return (
    <goa-public-form-task status={status}>{children}</goa-public-form-task>
  )
}

export default GoabPublicFormTask;
