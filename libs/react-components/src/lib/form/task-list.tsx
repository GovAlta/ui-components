import { ReactNode } from "react";
import { Margins } from "@abgov/ui-components-common";

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

interface GoabPublicFormTaskListProps extends Margins {
  heading?: string;
  children: ReactNode;
}

export function GoabPublicFormTaskList({
  heading = "",
  children,
  mt,
  mr,
  mb,
  ml,
}: GoabPublicFormTaskListProps) {
  return (
    <goa-public-form-task-list 
      heading={heading}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-public-form-task-list>
  );
}

export default GoabPublicFormTaskList;
