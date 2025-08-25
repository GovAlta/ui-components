import type { JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-actions": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardActionsProps extends DataGridProps {
  children?: React.ReactNode;
}

export function GoabCardActions(props: GoabCardActionsProps): JSX.Element {
  const [dataGridProps, {children}] = useDataGridProps(props);

  return <goa-card-actions {...dataGridProps}>{children}</goa-card-actions>;
}

export default GoabCardActions;
