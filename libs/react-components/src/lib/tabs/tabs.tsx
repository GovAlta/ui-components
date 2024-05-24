interface WCProps {
  initialtab?: number;
}
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-tabs": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface ABGovTabsProps {
  initialTab?: number;
  children?: React.ReactNode;
  testId?: string;
}

export function ABGovTabs({ initialTab, testId, children }: ABGovTabsProps): JSX.Element {
  return (
    <goa-tabs 
      initialtab={initialTab}
      data-testid={testId}
    >
      {children}
    </goa-tabs>
  );
}

export default ABGovTabs;
