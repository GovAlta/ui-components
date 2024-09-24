import { ReactNode } from "react";
import { GoAIconType } from "../icon/icon";


interface WCProps {
  icon?: GoAIconType;
  testid?: string;
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
export interface GoASideMenuHeadingProps {
  meta?: ReactNode;
  icon?: GoAIconType;
  testId?: string;
  children?: ReactNode;
}

export function GoASideMenuHeading(props: GoASideMenuHeadingProps) {
  return (
    <goa-side-menu-heading
      icon={props.icon}
      testid={props.testId}
    >
      {props.children}
      {props.meta && <span slot="meta">{props.meta}</span>}
    </goa-side-menu-heading>
  );
}

export default GoASideMenuHeading;
