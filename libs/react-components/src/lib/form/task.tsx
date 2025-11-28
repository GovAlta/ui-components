import { ReactNode } from "react";
import { DataGridProps, GoabPublicFormTaskStatus } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

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

interface GoabPublicFormTaskProps extends DataGridProps {
  status?: GoabPublicFormTaskStatus;
  children: ReactNode;
}

export function GoabPublicFormTask({
  status = "cannot-start",
  ...props
}: GoabPublicFormTaskProps) {
  const _props = extractProps<WCProps>(
    { status, ...props },
    {
      attributeMapping: "lowercase",
    }
  );

  return <goa-public-form-task {..._props}>{props.children}</goa-public-form-task>;
}

export default GoabPublicFormTask;
