import type { JSX } from "react";

interface WCProps {
  heading?: React.ReactNode;
  disabled?: string;
  slug?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-tab": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabTabItemProps {
  /** The text label for this tab. Can also pass React nodes for custom heading content. */
  heading?: React.ReactNode;
  /** When true, disables the tab so it cannot be selected. */
  disabled?: boolean;
  /** Content rendered inside the tab panel. */
  children?: React.ReactNode;
  /** URL-friendly identifier for the tab, used for hash-based navigation. */
  slug?: string;
}

export function GoabTab({
  heading,
  disabled,
  slug,
  children,
}: GoabTabItemProps): JSX.Element {
  return (
    <goa-tab
      slug={slug}
      disabled={disabled ? "true" : undefined}
      heading={typeof heading === "string" ? heading : undefined}
    >
      {typeof heading !== "string" && <span slot="heading">{heading}</span>}
      {children}
    </goa-tab>
  );
}
