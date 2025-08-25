import { ReactNode } from "react";
import { Margins } from "@abgov/ui-components-common";
import { DataGridProps, useDataGridProps } from "../common/data-props";

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

interface GoabPublicFormTaskListProps extends Margins, DataGridProps {
  heading?: string;
  children: ReactNode;
}

export function GoabPublicFormTaskList(props: GoabPublicFormTaskListProps) {
  const [dataGridProps, {
    heading = "",
    children,
    mt,
    mr,
    mb,
    ml,
  }] = useDataGridProps(props);

  return (
    <goa-public-form-task-list
      heading={heading}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      {...dataGridProps}
    >
      {children}
    </goa-public-form-task-list>
  );
}

export default GoabPublicFormTaskList;
