import React, { useEffect, useRef } from "react";
import { GoABTabsOnChangeDetail } from "@abgov/ui-components-common";

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

export interface GoABTabsProps {
  initialTab?: number;
  children?: React.ReactNode;
  testId?: string;
  onChange?: (detail: GoABTabsOnChangeDetail) => void;
}

export function GoABTabs({
  initialTab,
  children,
  testId,
  onChange,
}: GoABTabsProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element && onChange) {
      const handler = (event: Event) => {
        const detail = (event as CustomEvent<GoABTabsOnChangeDetail>).detail;
        onChange(detail);
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

export default GoABTabs;
