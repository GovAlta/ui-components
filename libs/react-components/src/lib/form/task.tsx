import { ReactNode } from "react";
import { GoabPublicFormTaskStatus } from "@abgov/ui-components-common";
import { useDataGridProps } from "../common/data-props";

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
  [key: `data-grid${string}`]: string | boolean | undefined;
};

export function GoabPublicFormTask(props: GoabPublicFormTaskProps) {
  const [dataGridProps, { status = "cannot-start", children}] = useDataGridProps(props);

  return <goa-public-form-task status={status}  {...dataGridProps}>{children}</goa-public-form-task>;
}

export default GoabPublicFormTask;
