import React, { useEffect, useRef, type JSX } from "react";
import { GoabTabsOnChangeDetail, GoabTabsOrientation, GoabTabsVariant } from "@abgov/ui-components-common";

interface WCProps {
  initialtab?: number;
  ref: React.RefObject<HTMLElement | null>;
  onChange?: (tab: number) => void;
  testid?: string;
  variant?: GoabTabsVariant;
  version?: string;
  orientation?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-tabs": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabxTabsProps {
  initialTab?: number;
  children?: React.ReactNode;
  testId?: string;
  variant?: GoabTabsVariant;
  /** Tab layout orientation. "auto" stacks vertically on mobile (default), "horizontal" keeps horizontal on all screen sizes. */
  orientation?: GoabTabsOrientation;
  onChange?: (detail: GoabTabsOnChangeDetail) => void;
}

export function GoabxTabs({
  initialTab,
  children,
  testId,
  onChange,
  variant,
  orientation,
}: GoabxTabsProps): JSX.Element {
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
    <goa-tabs
      ref={ref}
      initialtab={initialTab}
      testid={testId}
      variant={variant}
      version="2"
      orientation={orientation}
    >
      {children}
    </goa-tabs>
  );
}

export default GoabxTabs;
