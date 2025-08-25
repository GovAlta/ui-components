import { ReactNode } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps {
  maxcolumncount?: number;
  heading?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer-nav-section": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabFooterNavSectionProps extends DataGridProps {
  maxColumnCount?: number;
  heading?: string;
  testId?: string;
  children?: ReactNode;
}

export function GoabAppFooterNavSection(props: GoabFooterNavSectionProps) {
  const [dataGridProps, {
    heading,
    maxColumnCount = 1,
    testId,
    children,
  }] = useDataGridProps(props);

  return (
    <goa-app-footer-nav-section
      slot="nav"
      heading={heading}
      maxcolumncount={maxColumnCount}
      testid={testId}
      {...dataGridProps}
    >
      {children}
    </goa-app-footer-nav-section>
  );
}

export default GoabAppFooterNavSection;
