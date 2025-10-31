import { ReactNode } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps {
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer-meta-section": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabAppFooterMetaSectionProps extends DataGridProps {
  testId?: string;
  children?: ReactNode;
}

export function GoabAppFooterMetaSection(props: GoabAppFooterMetaSectionProps) {
  const [dataGridProps, { testId, children }] = useDataGridProps(props);

  return (
    <goa-app-footer-meta-section testid={testId} slot="meta" {...dataGridProps}>
      {children}
    </goa-app-footer-meta-section>
  );
}

export default GoabAppFooterMetaSection;
