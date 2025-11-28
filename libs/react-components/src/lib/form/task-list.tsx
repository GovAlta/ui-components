import { ReactNode } from "react";
import { Margins, DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

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
  const _props = extractProps<WCProps>(props, {
    attributeMapping: "lowercase",
  });

  return (
    <goa-public-form-task-list {..._props}>
      {props.children}
    </goa-public-form-task-list>
  );
}

export default GoabPublicFormTaskList;
