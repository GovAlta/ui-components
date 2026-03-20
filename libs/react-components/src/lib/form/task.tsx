import { ReactNode } from "react";
import { DataAttributes, GoabPublicFormTaskStatus } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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

interface GoabPublicFormTaskProps extends DataAttributes {
  status?: GoabPublicFormTaskStatus;
  children: ReactNode;
}

export function GoabPublicFormTask({
  status = "cannot-start",
  children,
  ...rest
}: GoabPublicFormTaskProps) {
  const _props = transformProps<WCProps>({ status, ...rest }, lowercase);

  return <goa-public-form-task {..._props}>{children}</goa-public-form-task>;
}

export default GoabPublicFormTask;
