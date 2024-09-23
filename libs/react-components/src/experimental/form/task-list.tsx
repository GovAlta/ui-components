import { ReactNode } from "react";
import { Margins } from "../../common/styling";

interface WCProps extends Margins {
  heading: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-public-form-task-list": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

type GoAPublicFormTaskListProps = {
  heading: string;
  children: ReactNode;
}

export function GoAPublicFormTaskList({heading, children}: GoAPublicFormTaskListProps) {
  return (
    <goa-public-form-task-list heading={heading}>{children}</goa-public-form-task-list>
  )  
}
