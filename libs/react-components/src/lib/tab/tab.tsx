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
  /**
   * The text label for this tab. Can also use the heading slot for custom content.
   * @default ""
   */
  heading?: React.ReactNode;
  disabled?: boolean;
  /** TO REVIEW: The content rendered inside this tab panel. */
  children?: React.ReactNode;
  slug?: string;
}

export function GoabTab({ heading, disabled, slug, children }: GoabTabItemProps): JSX.Element {
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
