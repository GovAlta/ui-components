import { ReactNode } from "react";
import {
  GoabIconType,
  GoabLinkColor,
  GoabLinkSize,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  leadingicon?: GoabIconType;
  trailingicon?: GoabIconType;
  action?: string;
  actionArgs?: string;
  actionArg?: string;
  testid?: string;
  color?: GoabLinkColor;
  size?: GoabLinkSize;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-link": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabLinkProps extends Margins, DataAttributes {
  /** @required Content rendered inside the link. */
  children: ReactNode;
  /** Icon displayed before the link text. */
  leadingIcon?: GoabIconType;
  /** Icon displayed after the link text. */
  trailingIcon?: GoabIconType;
  /** Custom action event name to dispatch when the link is clicked. */
  action?: string;
  /** Object of arguments to pass with the action event. */
  actionArgs?: Record<string, unknown>;
  /** Single argument to pass with the action event. Deprecated, use actionArgs instead. */
  actionArg?: string;
  /** Sets the color theme. 'interactive' for blue, 'dark' for black, 'light' for white text. @default "interactive" */
  color?: GoabLinkColor;
  /** Sets the text size and corresponding icon size. @default "medium" */
  size?: GoabLinkSize;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

export function GoabLink({
  actionArgs,
  actionArg,
  color = "interactive",
  size = "medium",
  children,
  ...rest
}: GoabLinkProps) {
  const _props = transformProps<WCProps>({ color, size, ...rest }, lowercase);

  return (
    <goa-link action-arg={actionArg} action-args={JSON.stringify(actionArgs)} {..._props}>
      {children}
    </goa-link>
  );
}

export default GoabLink;
