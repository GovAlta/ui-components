import { ReactNode, type JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps {
  maxcontentwidth?: string;
  testid?: string;
  url?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabAppFooterProps extends DataGridProps {
  maxContentWidth?: string;
  children?: ReactNode;
  testId?: string;
  url?: string;
}

// legacy name
export type FooterProps = GoabAppFooterProps;

export function GoabAppFooter(props: GoabAppFooterProps): JSX.Element {
  const [dataGridProps, {
    maxContentWidth,
    children,
    testId,
    url,
  }] = useDataGridProps(props);
  return (
    <goa-app-footer maxcontentwidth={maxContentWidth} testid={testId} url={url} {...dataGridProps}>
      {children}
    </goa-app-footer>
  );
}

export default GoabAppFooter;
