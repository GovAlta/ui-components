import { ReactNode } from "react";
import { Margins, DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  heading?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form-task-list": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoabPublicFormTaskListProps extends Margins, DataAttributes {
  heading?: string;
  children: ReactNode;
}

export function GoabPublicFormTaskList({
  children,
  ...rest
}: GoabPublicFormTaskListProps) {
  const _props = transformProps<WCProps>(rest, lowercase);

  return <goa-public-form-task-list {..._props}>{children}</goa-public-form-task-list>;
}

export default GoabPublicFormTaskList;
