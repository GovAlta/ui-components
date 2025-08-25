import type { JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-group": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardGroupProps extends DataGridProps {
  children?: React.ReactNode;
}

export function GoabCardGroup(props: GoabCardGroupProps): JSX.Element {
  const [dataGridProps, {children}] = useDataGridProps(props);

  return <goa-card-group {...dataGridProps}>{children}</goa-card-group>;
}

export default GoabCardGroup;
