import type { JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-card-content": React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCardContentProps extends DataGridProps {
  children?: React.ReactNode;
}

export function GoabCardContent(props: GoabCardContentProps): JSX.Element {
  const [dataGridProps, {children}] = useDataGridProps(props);

  return <goa-card-content {...dataGridProps}>{children}</goa-card-content>;
}

export default GoabCardContent;
