import { ReactNode } from "react";
import { GoabPublicFormTaskStatus } from "@abgov/ui-components-common";

interface WCProps {
  status?: GoabPublicFormTaskStatus;
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
  status?: GoabPublicFormTaskStatus;
  children: ReactNode;
};

export function GoabPublicFormTask({ status = "cannot-start", children }: GoabPublicFormTaskProps) {
  return <goa-public-form-task status={status}>{children}</goa-public-form-task>;
}

export default GoabPublicFormTask;
