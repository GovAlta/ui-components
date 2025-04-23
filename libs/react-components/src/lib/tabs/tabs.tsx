import React, { useEffect, useRef } from "react";
import { GoabTabsOnChangeDetail } from "../../common/types";

interface WCProps {
  initialtab?: number;
  ref: React.RefObject<HTMLElement>;
  onChange?: (tab: number) => void;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-tabs": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabTabsProps {
  initialTab?: number;
  children?: React.ReactNode;
  testId?: string;
  onChange?: (detail: GoabTabsOnChangeDetail) => void;
}

export function GoabTabs({
  initialTab,
  children,
  testId,
  onChange,
}: GoabTabsProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element && onChange) {
      const handler = (event: Event) => {
        const detail = (event as CustomEvent<GoabTabsOnChangeDetail>).detail;
        onChange(detail);
      };
      element.addEventListener("_change", handler);
      return () => {
        element.removeEventListener("_change", handler);
      };
    }
  }, [onChange]);

  return (
    <goa-tabs ref={ref} initialtab={initialTab} testid={testId}>
      {children}
    </goa-tabs>
  );
}

export default GoabTabs;
