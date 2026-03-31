import React, { useEffect, useRef, type JSX } from "react";
import {
  GoabTabsOnChangeDetail,
  GoabTabsOrientation,
  GoabTabsVariant,
  GoabTabsNavigation,
} from "@abgov/ui-components-common";

interface WCProps {
  initialtab?: number;
  ref: React.RefObject<HTMLElement | null>;
  onChange?: (tab: number) => void;
  testid?: string;
  variant?: GoabTabsVariant;
  navigation?: GoabTabsNavigation;
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

export interface GoabTabsProps {
  /** The initially active tab (1-based index). If not set, the first tab is active. */
  initialTab?: number;
  /** Content rendered inside the tabs container, typically GoabTab components. */
  children?: React.ReactNode;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Visual style variant. "segmented" shows pill-style tabs with animation. @default "default" */
  variant?: GoabTabsVariant;
  /** Tab layout orientation. "auto" stacks vertically on mobile, "horizontal" keeps horizontal on all screen sizes. @default "auto" */
  orientation?: GoabTabsOrientation;
  /** Controls URL navigation mode on tab change. @default "hash" */
  navigation?: GoabTabsNavigation;
  /** Callback fired when the active tab changes. */
  onChange?: (detail: GoabTabsOnChangeDetail) => void;
}

export function GoabTabs({
  initialTab,
  children,
  testId,
  onChange,
  variant,
  orientation,
  navigation,
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
    <goa-tabs
      ref={ref}
      initialtab={initialTab}
      testid={testId}
      variant={variant}
      version="2"
      orientation={orientation}
      navigation={navigation}
    >
      {children}
    </goa-tabs>
  );
}

export default GoabTabs;
