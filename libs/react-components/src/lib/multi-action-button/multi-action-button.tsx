import { GoabButtonType } from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";

interface WCProps {
  text: string;
  type: GoabButtonType;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-multi-action-button": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabMultiActionButtonProps {
  text: string;
  type?: GoabButtonType;
  testId?: string;
  children?: ReactNode;
}

export function GoabMultiActionButton({
  text,
  type = "primary",
  testId,
  children,
}: GoabMultiActionButtonProps): JSX.Element {
  return (
    <goa-multi-action-button
      text={text}
      type={type}
      testid={testId}
    >
      {children}
    </goa-multi-action-button>
  );
}

export default GoabMultiActionButton;
