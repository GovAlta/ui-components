import { GoabIconType } from "@abgov/ui-components-common";
import type { JSX } from "react";

interface WCProps {
  text: string;
  action: string;
  icon?: GoabIconType;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-menu-action": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabMenuActionProps {
  text: string;
  action: string;
  icon?: GoabIconType;
  testId?: string;
}

export function GoabMenuAction({ text, icon, action, testId }: GoabMenuActionProps): JSX.Element {
  return (
    <goa-menu-action text={text} action={action} icon={icon} testid={testId}></goa-menu-action>
  );
}

export default GoabMenuAction;
