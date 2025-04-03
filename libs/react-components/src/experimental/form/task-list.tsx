import { ReactNode } from "react";
import { Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  heading: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form-task-list": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

type GoabPublicFormTaskListProps = {
  heading: string;
  children: ReactNode;
};

export function GoabPublicFormTaskList({
  heading,
  children,
}: GoabPublicFormTaskListProps) {
  return (
    <goa-public-form-task-list heading={heading}>{children}</goa-public-form-task-list>
  );
}

export default GoabPublicFormTaskList;
