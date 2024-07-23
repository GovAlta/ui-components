import React, { useEffect, useRef } from "react";

interface WCProps {
  initialtab?: number;
  ref: React.RefObject<HTMLElement>;
  onChange?: (tab: number) => void;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-tabs": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoATabsProps {
  initialTab?: number;
  children?: React.ReactNode;
  testId?: string;
  onChange?: (tab: number) => void;
}

export function GoATabs({
  initialTab,
  children,
  testId,
  onChange,
}: GoATabsProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element && onChange) {
      const handler = (event: Event) => {
        const customEvent = event as CustomEvent;
        onChange(customEvent.detail.tab);
      };
      element.addEventListener("_change", handler);
      return () => {
        element.removeEventListener("_change", handler);
      };
    }
  }, [onChange]);

  return (
    <goa-tabs ref={ref} initialtab={initialTab} data-testid={testId}>
      {children}
    </goa-tabs>
  );
}

export default GoATabs;
