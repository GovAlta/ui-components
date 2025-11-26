import React, { useEffect, useRef, type JSX } from "react";
import { GoabTabsOnChangeDetail, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  initialtab?: number;
  ref: React.RefObject<HTMLElement | null>;
  updateurl?: string;
  onChange?: (tab: number) => void;
  testid?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-tabs": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabTabsProps extends Margins {
  initialTab?: number;
  children?: React.ReactNode;
  testId?: string;
  updateUrl?: boolean;
  onChange?: (detail: GoabTabsOnChangeDetail) => void;
}

export function GoabTabs({
  initialTab,
  children,
  testId,
  updateUrl = true,
  onChange,
  mt,
  ml,
  mb,
  mr
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
    <goa-tabs ref={ref} initialtab={initialTab} testid={testId} updateurl={updateUrl ? "true": "false"} mt={mt} mr={mr} mb={mb} ml={ml}>
      {children}
    </goa-tabs>
  );
}

export default GoabTabs;
