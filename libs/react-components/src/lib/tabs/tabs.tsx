import React, { useEffect, useRef, type JSX } from "react";
import { GoabTabsOnChangeDetail, GoabTabsVariant } from "@abgov/ui-components-common";

interface WCProps {
  initialtab?: number;
  ref: React.RefObject<HTMLElement | null>;
  onChange?: (tab: number) => void;
  testid?: string;
  variant?: GoabTabsVariant;
}

declare module "react" {
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
  variant?: GoabTabsVariant;
  onChange?: (detail: GoabTabsOnChangeDetail) => void;
}

export function GoabTabs({
  initialTab,
  children,
  testId,
  variant,
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
    <goa-tabs ref={ref} initialtab={initialTab} testid={testId} variant={variant}>
      {children}
    </goa-tabs>
  );
}

export default GoabTabs;
