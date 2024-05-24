import { ABGovIconType } from "@abgov/ui-components-common";
import { ReactNode } from "react";

interface WCProps {
  icon?: ABGovIconType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-side-menu-heading": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface ABGovSideMenuHeadingProps {
  meta?: ReactNode;
  testId?: string;
  icon?: ABGovIconType
  children?: ReactNode;
}

export function ABGovSideMenuHeading(props: ABGovSideMenuHeadingProps) {
  return (
    <goa-side-menu-heading
      icon={props.icon}
      data-testid={props.testId}
    >
      {props.children}
      {props.meta && <span slot="meta">{props.meta}</span>}
    </goa-side-menu-heading>
  );
}

export default ABGovSideMenuHeading;
